<script setup lang="ts">
import { useCloned, useDateFormat } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import {
  ServiceRequestClientIdentificationType,
  ServiceRequestEditionModel,
  ServiceRequestEmailInteractionModel,
  ServiceRequestModel,
  ServiceRequestStatusChangeModel,
} from 'src/api';
import FormBtnComponent from 'src/components/ui/buttom/FormBtnComponent.vue';
import NavigationBtnComponent from 'src/components/ui/buttom/NavigationBtnComponent.vue';
import DialogFormComponent from 'src/components/ui/containers/DialogFormComponent.vue';
import ItemResume from 'src/components/ui/containers/ItemResume.vue';
import PageContainerComponent from 'src/components/ui/containers/PageContainerComponent.vue';
import SectionContainerComponent from 'src/components/ui/containers/SectionContainerComponent.vue';
import FormGeneratorComponent from 'src/components/ui/forms/FormGeneratorComponent.vue';
import {
  TipoEstadoMovimiento,
  TipoEstadoMovimientoType,
  TipoEstadoSolicitud,
  TipoEstadoSolicitudType,
  TipoMovimientoSolicitud,
} from 'src/enums/Dictionary.enum';
import {
  ClientData,
  initRequestBusinessDataForm,
  initRequestClientData,
  initRequestClientDataForm,
} from 'src/models/forms/solicitudes/model.solicitudes.datosCliente';
import {
  IFieldSpecification,
  IForm,
  ISelectOption,
} from 'src/models/schemas/IFormSpecification';
import {
  GetServiceRequest,
  PutServiceRequest,
  PutServiceRequestsStatus,
} from 'src/repository/solicitudesServicio.repository';
import { siteMap } from 'src/router/siteMap';
import { useAuthStore } from 'src/stores/auth.store';
import { getSelectList } from 'src/utils/array';
import { formSetter } from 'src/utils/form-resolver';
import { Loader } from 'src/utils/loading';
import { padronBusiness, padronPerson } from 'src/utils/padron';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  id: string;
}>();

const model = ref<ServiceRequestModel>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formData = ref<Record<string, any>>();
const formSchema = ref<{ [key: string]: IFieldSpecification } | null>();

const { cloned: status, sync: resetEstatus } =
  useCloned<TipoEstadoSolicitudType>(model.value?.status ?? 'New');
const statusOptions = ref<ISelectOption[]>(getSelectList(TipoEstadoSolicitud));

const { cloned: dialogHandler, sync: resetDialogData } = useCloned<
  Nullable<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model: any;
    formSchema: IForm<Record<string, IFieldSpecification>>;
    files: boolean;
    show: boolean;
    action: 'U' | 'US';
  }>
>({
  model: null,
  formSchema: null,
  files: false,
  show: false,
  action: null,
});

const requestDataSquema = formSetter(
  model.value?.typeId as number,
  model.value?.formData as string
);

const authStore = useAuthStore();
const { profile: userInfo } = storeToRefs(authStore);

const loader = Loader;
const $q = useQuasar();

const alert = (title: string, message: string) => {
  $q.dialog({
    title: title,
    message: message,
  });
};

const edit = () => {
  if (model.value?.typeId && model.value?.formData) {
    const clientForm = initRequestClientDataForm();
    dialogHandler.value.model = Object.assign(
      initRequestClientData(model.value),
      requestDataSquema?.model
    );
    dialogHandler.value.formSchema = {
      form: Object.assign({}, clientForm.form, requestDataSquema?.schema),
      sections:
        clientForm.sections && requestDataSquema.sections
          ? [...clientForm.sections, ...requestDataSquema.sections]
          : undefined,
    };
    dialogHandler.value.files = requestDataSquema?.files ?? false;
  }
  dialogHandler.value.action = 'U';
  dialogHandler.value.show = true;
};

const editStatus = () => {
  if (model.value?.typeId) {
    dialogHandler.value.model = {
      id: model.value.id,
      status: model.value.status,
      concept: null,
    };
    const changeStatusSchema: {
      [Key in keyof ServiceRequestStatusChangeModel]: IFieldSpecification;
    } = {
      concept: {
        label: 'Concepto',
        GetType: 'input',
      },
      status: {
        label: 'Estado',
        GetType: 'select',
        options: statusOptions.value,
      },
    };
    dialogHandler.value.action = 'US';
    dialogHandler.value.formSchema = { form: changeStatusSchema, sections: [] };
  }
  dialogHandler.value.show = true;
};

const findPersona = async () => {
  loader.showLoader('Consultando...');
  const result = await padronPerson(dialogHandler.value.model);
  loader.hideLoader();

  if (!result.error) {
    dialogHandler.value.model.firstName = result.model.firstName;
    dialogHandler.value.model.secondName = result.model.secondName;
    dialogHandler.value.model.firstLastName = result.model.firstLastName;
    dialogHandler.value.model.secondLastName = result.model.secondLastName;
    dialogHandler.value.model.birthDate = result.model.birthDate;
  } else {
    alert('Solicitudes de Servicio', result.error);
  }
};

const findBusiness = async () => {
  loader.showLoader('Consultando...');
  if (dialogHandler.value.model.identification) {
    const result = await padronBusiness(
      dialogHandler.value.model.identification
    );
    loader.hideLoader();
    if (!result.error && dialogHandler.value.model) {
      dialogHandler.value.model.identification = result.model?.id;
      dialogHandler.value.model.firstName =
        result.model?.nombreComercial?.trim().length
          ? result.model?.nombreComercial
          : result.model?.razonSocial;
    } else {
      alert('Solicitudes de Servicio', result.error ?? '');
    }
  }
};

const submit = async () => {
  if (dialogHandler.value.action == 'U') {
    const dataFields = Object.keys(dialogHandler.value.model).filter(
      (x) => !x.includes('_File_')
    );
    const fields = dataFields.map((field) => [
      field,
      (dialogHandler.value.model as Record<string, string | number | null>)[
        field
      ],
    ]);

    const data: ServiceRequestEditionModel = {
      id: model.value?.id,
      client: {
        secondName: dialogHandler.value.model?.secondName,
        secondLastName: dialogHandler.value.model?.secondLastName,
        firstName: dialogHandler.value.model?.firstName,
        firstLastName: dialogHandler.value.model?.firstLastName,
        birthDate: dialogHandler.value.model.birthDate,
      },
      clientIdentification: {
        type: dialogHandler.value.model.tipoidentificacion,
        value: dialogHandler.value.model.identificacion,
      },
      clientContactInfo: [
        {
          type: 'Email',
          value: dialogHandler.value.model?.eMail,
        },
      ],
      formData: JSON.stringify(Object.fromEntries(fields)),
    };
    loader.showLoader('Guardando...');
    const serviceRequestResult = await PutServiceRequest(data);
    loader.hideLoader();

    if (serviceRequestResult?.IsSuccessful()) {
      dialogHandler.value.show = false;
      getServiceRequest(Number.parseInt(props.id));
    } else {
      alert(
        'Solicitudes de Servicio',
        `Error: ${
          serviceRequestResult.Errors[0] ?? serviceRequestResult.Message
        }`
      );
    }
  }
  if (dialogHandler.value.action == 'US') {
    const data: ServiceRequestStatusChangeModel = {
      id: model.value?.id,
      concept: dialogHandler.value.model.concept,
      status: dialogHandler.value.model.status,
    };

    if (model.value?.status != data.status) {
      loader.showLoader('Guardando...');
      const serviceRequestResult = await PutServiceRequestsStatus(data);
      loader.hideLoader();
      if (serviceRequestResult?.IsSuccessful()) {
        dialogHandler.value.show = false;
        getServiceRequest(Number.parseInt(props.id));
      } else {
        alert(
          'Estado de la Solicitud de Servicio',
          `Error: ${
            serviceRequestResult.Errors[0] ?? serviceRequestResult.Message
          }`
        );
        resetEstatus();
      }
    } else {
      alert(
        'Estado de la Solicitud de Servicio',
        'El Estado no ha sido modificado'
      );
    }
  }
};

const getServiceRequest = async (id: number) => {
  loader.showLoader('Cargando...');
  const serviceRequestResult = await GetServiceRequest(id);
  loader.hideLoader();
  if (serviceRequestResult.IsSuccessful() && serviceRequestResult.Payload) {
    model.value = serviceRequestResult.Payload;
    formData.value = model.value?.formData
      ? JSON.parse(model.value?.formData)
      : null;

    model.value?.typeId
      ? (formSchema.value = formSetter(model.value.typeId).schema)
      : null;
    status.value = model.value?.status ?? status.value;
  } else {
    alert(
      'Solicitudes de Servicio',
      `Error: ${serviceRequestResult.Errors[0] ?? serviceRequestResult.Message}`
    );
  }
};

onMounted(async () => {
  await getServiceRequest(Number.parseInt(props.id));
});

watch(
  () =>
    (dialogHandler.value.model as ClientData)
      ?.identificationType as ServiceRequestClientIdentificationType,
  (n) => {
    if (
      dialogHandler.value.formSchema?.form.identificationType &&
      model.value?.formData &&
      model.value.typeId
    ) {
      if (n == 'Personal') {
        dialogHandler.value.formSchema.form = Object.assign(
          {},
          initRequestClientDataForm().form,
          requestDataSquema?.schema
        );
        (dialogHandler.value.model as ClientData).identificationType = n;
      }
      if (n == 'Commercial') {
        dialogHandler.value.formSchema.form = Object.assign(
          {},
          initRequestBusinessDataForm().form,
          requestDataSquema?.schema
        );
        (dialogHandler.value.model as ClientData).identificationType = n;
        (dialogHandler.value.model as ClientData).firstName = null;
        (dialogHandler.value.model as ClientData).firstLastName = null;
        (dialogHandler.value.model as ClientData).secondName = null;
        (dialogHandler.value.model as ClientData).secondLastName = null;
        (dialogHandler.value.model as ClientData).birthDate = null;
      }
      if (n == 'Passport') {
        dialogHandler.value.formSchema.form = Object.assign(
          {},
          initRequestClientDataForm().form,
          requestDataSquema?.schema
        );
        dialogHandler.value.formSchema.form.documentId.GetType = 'input';
        (dialogHandler.value.model as ClientData).identificationType = n;
      }
    }
  }
);
siteMap;
</script>

<template>
  <PageContainerComponent parent="solicitudesServicios">
    <template #actions>
      <NavigationBtnComponent
        v-if="
          userInfo?.roles?.includes('ServiceRequests.Edit') &&
          model?.status != 'Completed'
        "
        :label="
          $q.screen.gt.md ? 'Editar Solicitud' : $q.screen.gt.sm ? 'Editar' : ''
        "
        icon="fa-solid fa-pen-to-square"
        class="q-mx-sm"
        @click="edit"
      />
      <NavigationBtnComponent
        :label="
          $q.screen.gt.md
            ? 'Regresar al Listado'
            : $q.screen.gt.sm
            ? 'Regresar'
            : ''
        "
        icon="fa-solid fa-square-arrow-up-right"
        class="q-mx-sm"
        @click="$router.push({ name: siteMap.solicitudesServicios.name })"
      />
    </template>

    <template v-if="model">
      <SectionContainerComponent>
        <div class="flex justify-between items-center">
          <div class="text-h5">
            {{ model?.type?.name?.toLocaleUpperCase() }}
          </div>
          <span class="flex no-wrap items-center">
            <template
              v-if="
                userInfo?.roles?.includes('ServiceRequests.Edit') &&
                model.status != 'Completed'
              "
            >
              <FormBtnComponent
                :label="`${$q.screen.gt.sm ? 'Actualizar ' : ''}Estado`"
                color="accent"
                @click="editStatus"
              />
            </template>
            <template v-else>
              <q-chip v-if="$q.screen.gt.sm" color="accent" text-color="white">
                <template v-if="$q.screen.gt.sm">
                  <span>Estado</span>
                  <q-separator vertical class="q-mx-sm" color="white" />
                </template>
                {{
                  statusOptions
                    .find((x) => x.value == status)
                    ?.text.toLocaleUpperCase()
                }}
              </q-chip>
            </template>
          </span>
        </div>
        <q-separator class="q-my-md" />
        <div class="row">
          <ItemResume
            :title="`${$q.screen.gt.md ? 'Número de' : '#'}  Seguimiento`"
            :value="model.id"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-3 col-md-3 col-lg-2"
          />
          <ItemResume
            v-if="$q.screen.lt.md"
            title="Estado"
            :value="statusOptions.find((x) => x.value == status)?.text"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-3 col-md-3 col-lg-2"
          />
          <ItemResume
            title="Fecha de Creación"
            :value="useDateFormat(model.createdOnUtc ?? '', 'YYYY-MM-DD').value"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-3 col-md-3 col-lg-2"
          />
          <ItemResume
            title="Intermediario"
            :value="model?.businessOwner?.name?.toLocaleUpperCase()"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-2 col-md-3 col-lg-2"
          />
          <ItemResume
            v-if="model?.businessOwner?.responsibleUser?.fullName"
            title="Gerente"
            :value="
              model?.businessOwner?.responsibleUser?.fullName?.toLocaleUpperCase()
            "
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-2 col-md-3 col-lg-2"
          />
          <ItemResume
            title="Representante"
            :value="model?.responsibleUser?.fullName?.toLocaleUpperCase()"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-4 col-md-2"
          />
        </div>
      </SectionContainerComponent>
      <SectionContainerComponent>
        <div class="text-h5 q-pa-sm flex items-baseline">
          <q-icon class="q-pr-md" size="sm" name="fa-solid fa-user" />
          Cliente
        </div>
        <q-separator class="q-mx-sm q-my-md" />
        <div class="row">
          <ItemResume
            title="Nombre"
            :value="model.client?.fullName"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-md-6 col-lg-4"
          />
          <ItemResume
            :title="`${$q.screen.gt.sm ? 'Número de' : '#'}  Identificación`"
            :value="model.clientIdentification?.value"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-4 col-md-6 col-lg-3"
          />
          <ItemResume
            title="Fecha de Nacimiento"
            :value="
              useDateFormat(model.client?.birthDate ?? '', 'YYYY-MM-DD').value
            "
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-4 col-md-6 col-lg-2"
          />
          <ItemResume
            v-if="model.clientContactInfo"
            title="Correo Electrónico"
            :value="model.clientContactInfo[0].value"
            html-class="text-subtitle1"
            type="v"
            class="col-xs-12 col-sm-4 col-md-6 col-lg-3"
          />
        </div>
      </SectionContainerComponent>
      <template
        v-if="Object.keys(formSchema ?? {}).some((x) => !x.includes('_File_'))"
      >
        <SectionContainerComponent>
          <div class="text-h5 q-pa-sm flex items-baseline">
            <q-icon class="q-pr-md" size="sm" name="fa-solid fa-file-invoice" />
            {{ `Inf${$q.screen.gt.sm ? 'ormación de la' : '.'} Solicitud` }}
          </div>
          <q-separator class="q-mx-sm q-my-md" />
          <div class="row">
            <template v-for="(field, key) in formSchema" :key="key">
              <ItemResume
                v-if="!(key as string).includes('_File_')"
                :title="field.label"
                :value="formData?.[key]"
                html-class="text-subtitle1"
                type="v"
                class="col-xs-12 col-sm-4 col-lg-2"
              />
            </template>
          </div>
        </SectionContainerComponent>
      </template>
    </template>
    <template v-if="model?.interactions?.length">
      <q-expansion-item class="q-pa-md q-my-md bg-white shadow-8">
        <template #header>
          <div class="full-width text-h5 q-pa-sm flex items-baseline">
            <q-icon
              class="q-pr-md"
              size="sm"
              name="fa-solid fa-envelopes-bulk"
            />
            {{ `Movimientos ${$q.screen.gt.sm ? 'de la Solicitud' : ''}` }}
          </div>
        </template>

        <template
          v-for="(interaction, interactionIndex) in model?.interactions?.sort((a, b) => -(a?.createdOnUtc as string)?.localeCompare(b.createdOnUtc as string))"
          :key="interactionIndex"
        >
          <q-card class="q-ma-md" flat bordered>
            <q-card-section>
              <div class="flex items-center no-wrap">
                <q-chip class="text-subtitle1 text-white" color="accent">
                  {{
                    Object.entries(TipoMovimientoSolicitud).find(
                      (x) => x[1] == interaction?.type
                    )?.[0]
                  }}
                </q-chip>

                <q-separator vertical class="q-mx-md" />
                <div
                  :class="`${$q.screen.gt.sm ? 'text-h6' : 'text-subtitle2'}`"
                >
                  {{ interaction.concept }}
                </div>
              </div>
            </q-card-section>

            <template
              v-if="(interaction.dataByType as ServiceRequestEmailInteractionModel)?.attachmentsInfo?.length"
            >
              <q-separator />
              <q-card-section>
                <div class="text-h6 q-my-sm text-secondary">Asunto:</div>
                {{
                  (
                    interaction.dataByType as ServiceRequestEmailInteractionModel
                  )?.subject
                }}
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="text-h6 q-my-sm text-secondary">
                  Archivos Enviados:
                </div>
                <template
                  v-for="(file, fileIndex) in (interaction.dataByType as ServiceRequestEmailInteractionModel)
              ?.attachmentsInfo"
                  :key="fileIndex"
                >
                  <q-separator
                    v-if="$q.screen.lt.md && fileIndex != 0"
                    class="full-width q-my-sm"
                  />
                  <div class="text-caption flex items-center no-wrap">
                    <q-icon
                      name="fa-solid fa-file"
                      color="primary"
                      :class="`${$q.screen.gt.sm ? 'q-mx-sm' : ''}`"
                    />
                    <q-separator
                      v-if="$q.screen.lt.md"
                      class="q-mx-sm"
                      vertical
                    />
                    <div :class="`${$q.screen.gt.sm ? 'flex' : ''}`">
                      <div class="flex">
                        <span class="text-primary q-mr-sm">Documento:</span>
                        <span class="font-boldregular">
                          {{
                            file.contentId
                              ? formSchema?.[file.contentId].label
                              : ''
                          }}
                        </span>
                      </div>
                      <q-separator
                        v-if="$q.screen.gt.sm"
                        vertical
                        class="q-mx-sm"
                      />
                      <div class="flex">
                        <span class="text-primary q-mr-sm">
                          Nombre del archivo:
                        </span>
                        <span class="font-boldregular">
                          {{ file.filename }}
                        </span>
                      </div>
                      <q-separator
                        v-if="$q.screen.gt.sm"
                        vertical
                        class="q-mx-sm"
                      />
                      <div class="flex">
                        <span class="text-primary q-mr-sm">Tamaño:</span>
                        <span class="font-boldregular">
                          {{ file.contentLength }}
                        </span>
                      </div>
                    </div>
                  </div>
                </template>
              </q-card-section>
            </template>

            <q-separator />

            <q-card-section class="flex">
              <span class="q-pa-sm text-subtitle1 self-rigth">
                Creado por:
                <q-chip color="secondary" class="text-white">
                  {{ interaction?.createdBy }}
                </q-chip>
              </span>
              <q-separator
                :class="`${$q.screen.xs ? 'full-width' : ''} q-ma-sm`"
                :vertical="$q.screen.gt.xs"
              />
              <span
                v-if="interaction.createdOnUtc"
                class="q-pa-sm text-subtitle1"
              >
                <q-icon
                  name="fa-solid fa-calendar"
                  class="q-mr-sm"
                  color="primary"
                />
                {{
                  useDateFormat(interaction.createdOnUtc ?? '', 'YYYY-MM-DD')
                    .value
                }}
              </span>
              <template
                v-if="(interaction?.dataByType as ServiceRequestEmailInteractionModel)?.to"
              >
                <q-separator
                  :class="`${$q.screen.xs ? 'full-width' : ''} q-ma-sm`"
                  :vertical="$q.screen.gt.xs"
                />
                <span class="q-pa-sm text-subtitle1">
                  <q-icon
                    name="fa-solid fa-paper-plane"
                    class="q-mr-sm"
                    color="primary"
                  />
                  {{
                    (
                      interaction?.dataByType as ServiceRequestEmailInteractionModel
                    )?.to
                  }}
                </span>
              </template>

              <template
                v-if="(interaction?.dataByType as ServiceRequestEmailInteractionModel)?.status"
              >
                <q-separator
                  :class="`${$q.screen.xs ? 'full-width' : ''} q-ma-sm`"
                  :vertical="$q.screen.gt.xs"
                />
                <span class="q-pa-sm text-subtitle1">
                  <q-icon
                    name="fa-solid fa-circle-exclamation"
                    class="q-mr-sm"
                    color="primary"
                  />
                  {{
                    (
                      Object.entries(TipoEstadoMovimiento).find(
                        (x) =>
                          x[1] ==
                          (
                            interaction?.dataByType as ServiceRequestEmailInteractionModel
                          )?.status
                      ) as [string, TipoEstadoMovimientoType]
                    )?.[0]
                  }}
                </span>
              </template>
            </q-card-section>
          </q-card>
        </template>
        <div class="row"></div>
      </q-expansion-item>
    </template>
  </PageContainerComponent>

  <!-- Dialogs -->
  <template
    v-if="dialogHandler.model && dialogHandler.formSchema && dialogHandler.show"
  >
    <DialogFormComponent :model-value="dialogHandler.show">
      <FormGeneratorComponent
        v-model="dialogHandler.model"
        :form-schema="dialogHandler.formSchema.form"
        :sections="
          dialogHandler.action == 'U'
            ? dialogHandler.formSchema.sections
            : undefined
        "
        form-name="Editar Solictud"
        submit-label="Actualizar"
        controls
        @close="resetDialogData()"
        @submit="submit()"
        @fetch-person="findPersona"
        @fetch-business="findBusiness"
      />
    </DialogFormComponent>
  </template>
  <!-- /Dialogs -->
</template>
