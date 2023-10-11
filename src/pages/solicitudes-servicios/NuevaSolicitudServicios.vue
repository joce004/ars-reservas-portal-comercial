<script setup lang="ts">
import { useCloned } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { FileUploadModel, ServiceRequestClientIdentificationType,ServiceRequestCreationModel } from 'src/api';
import NavigationBtnComponent from 'src/components/ui/buttom/NavigationBtnComponent.vue';
import PageContainerComponent from 'src/components/ui/containers/PageContainerComponent.vue';
import SectionContainerComponent from 'src/components/ui/containers/SectionContainerComponent.vue';
import FormGenerator from 'src/components/ui/forms/FormGeneratorComponent.vue';
import SelectComponent from 'src/components/ui/inputs/SelectComponent.vue';
import {
ClientData,
initRequestBusinessDataForm,
initRequestClientData,
initRequestClientDataForm,
} from 'src/models/forms/solicitudes/model.solicitudes.datosCliente';
import {
IFieldSpecification,
IForm,
ISelectOption
} from 'src/models/schemas/IFormSpecification';
import {
FetchServiceRequestType,
PostServiceRequestType,
} from 'src/repository/solicitudesServicio.repository';
import { siteMap } from 'src/router/siteMap';
import { useAuthStore } from 'src/stores/auth.store';
import { blobToBase64 } from 'src/utils/file';
import { formSetter } from 'src/utils/form-resolver';
import { Loader } from 'src/utils/loading';
import { padronBusiness, padronPerson } from 'src/utils/padron';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const servicios = ref<ISelectOption[]>();
const servicio = ref<number | null>(null);

const { cloned: form, sync: resetForm } = useCloned<
  Nullable<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model: any | null;
    formSchema: IForm<Record<string, IFieldSpecification>>;
    files: boolean;
  }>
>({
  model: null,
  formSchema: null,
  files: false,
});

// STORES
const authStore = useAuthStore();
const { profile: userInfo } = storeToRefs(authStore);

const loader = Loader;
const router = useRouter();
const $q = useQuasar();

const setForm = (selectedForm: number) => {
  const clientForm = initRequestClientDataForm();
  const formCreated = formSetter(selectedForm);

  form.value.model = Object.assign(
    {},
    initRequestClientData(),
    formCreated?.model
  );
  form.value.formSchema = {
    form: Object.assign({}, clientForm.form, formCreated?.schema),
    sections:
      clientForm.sections && formCreated.sections
        ? [...clientForm.sections, ...formCreated.sections]
        : undefined,
  };
  form.value.files = formCreated?.files ?? false;
};

const alert = (title: string, message: string) => {
  $q.dialog({
    title: title,
    message: message,
  });
};

const fetchServiceRequestType = async () => {
  loader.showLoader('Cargando...');
  const serviceRequestResult = await FetchServiceRequestType(
    userInfo.value?.businesses?.[0]?.id ?? undefined
  );
  if (serviceRequestResult.IsSuccessful()) {
    servicios.value = serviceRequestResult.Payload ?? [];
  } else {
    alert(
      'Solicitudes de Servicio',
      `Error: ${serviceRequestResult.Errors[0] ?? serviceRequestResult.Message}`
    );
  }
  loader.hideLoader();
};

const submit = async () => {
  if (form.value.model) {
    const dataFields = Object.keys(form.value.model).filter(
      (x) => !x.includes('_File_')
    );

    const fileFields = Object.keys(form.value.model).filter((x) =>
      x.includes('_File_')
    );

    const fields = dataFields.map((field) => [
      field,
      (form.value.model as Record<string, string | number | null>)[field],
    ]);

    const newfilesPromises = fileFields
      .filter((x) => form.value.model?.[x])
      .map<Promise<FileUploadModel>>(async (file) => {
        const fileValue = (
          form.value.model as Record<string, string | number | null>
        )[file] as unknown as File;
        return {
          id: file,
          fileName: form.value.formSchema?.form?.[file].label
            ? file.slice(file.lastIndexOf('_') + 1) +
              fileValue.name.slice(fileValue.name.lastIndexOf('.'))
            : fileValue.name,
          contentType: fileValue.type,
          length: fileValue.size,
          content: (await blobToBase64(fileValue)) as string,
        };
      });

    const newFiles = await Promise.all(newfilesPromises);

    const data: ServiceRequestCreationModel = {
      client: {
        secondName: form.value.model?.secondName,
        secondLastName: form.value.model?.secondLastName,
        firstName: form.value.model?.firstName,
        firstLastName: form.value.model?.firstLastName,
        birthDate: form.value.model?.birthDate,
      },
      clientIdentification: {
        type: form.value.model?.tipoidentificacion,
        value: form.value.model?.identificacion,
      },
      clientContactInfo: [
        {
          type: 'Email',
          value: form.value.model?.eMail,
        },
      ],
      formData: JSON.stringify(Object.fromEntries(fields)),
      files: newFiles,
      typeId: servicio.value ?? -1,
    };

    loader.showLoader('Guardando...');
    const serviceRequestResult = await PostServiceRequestType(data);
    loader.hideLoader();

    if (serviceRequestResult?.IsSuccessful()) {
      resetForm();
      router.push({ name: siteMap.solicitudesServicios.name });
    } else {
      alert(
        'Solicitudes de Servicio',
        `Error: ${
          serviceRequestResult.Errors[0] ?? serviceRequestResult.Message
        }`
      );
    }
  }
};

const findPersona = async () => {
  loader.showLoader('Consultando...');
  const result = await padronPerson(form.value.model);
  loader.hideLoader();

  if (!result.error) {
    form.value.model = result.model;
  } else {
    alert('Solicitudes de Servicio', result.error);
  }
};

const findBusiness = async () => {
  loader.showLoader('Consultando...');
  if (form.value.model.identification) {
    const result = await padronBusiness(form.value.model.identification);
    loader.hideLoader();
    if (!result.error && form.value.model) {
      form.value.model.identification = result.model?.id;
      form.value.model.firstName = result.model?.nombreComercial?.trim().length
        ? result.model?.nombreComercial
        : result.model?.razonSocial;
    } else {
      alert('Solicitudes de Servicio', result.error ?? '');
    }
  }
};

onMounted(async () => {
  await fetchServiceRequestType();
});

watch(
  () => servicio.value,
  (n) => (n ? setForm(n) : undefined)
);

watch(
  () =>
    (form.value.model as ClientData)
      ?.identificationType as ServiceRequestClientIdentificationType,
  (n) => {
    if (form.value.formSchema?.form.identificationType && servicio.value) {
      const formCreated = formSetter(servicio.value);

      if (n == 'Personal') {
        form.value.formSchema.form = Object.assign(
          {},
          initRequestClientDataForm().form,
          formCreated?.schema
        );
        (form.value.model as ClientData).identificationType = n;
      }
      if (n == 'Commercial') {
        form.value.formSchema.form = Object.assign(
          {},
          initRequestBusinessDataForm().form,
          formCreated?.schema
        );
        (form.value.model as ClientData).identificationType = n;
        (form.value.model as ClientData).birthDate = null;
        (form.value.model as ClientData).secondName = null;
        (form.value.model as ClientData).secondLastName = null;
      }
      if (n == 'Passport') {
        form.value.formSchema.form = Object.assign(
          {},
          initRequestClientDataForm().form,
          formCreated?.schema
        );
        form.value.formSchema.form.documentId.GetType = 'input';
        (form.value.model as ClientData).identificationType = n;
      }
    }
  }
);
</script>

<template>
  <PageContainerComponent parent="solicitudesServicios">
    <template #actions>
      <NavigationBtnComponent
        :label="
          $q.screen.gt.md
            ? 'Regresar al Listado'
            : $q.screen.gt.sm
            ? 'Regresar'
            : ''
        "
        icon="fa-solid fa-square-arrow-up-right"
        @click="$router.push({ name: siteMap.catalogoServicios.name })"
      />
    </template>
    <SectionContainerComponent>
      <SelectComponent
        v-model="servicio"
        :options="servicios"
        label="Tipo de Solicitud:"
        class="text-subtitle1 q-pa-none"
      />
    </SectionContainerComponent>

    <template v-if="form.model && form.formSchema">
      <SectionContainerComponent>
        <FormGenerator
          v-model="form.model"
          :form-schema="form.formSchema.form"
          :sections="form.formSchema.sections"
          :form-name="
            servicios?.find((x) => x.value === servicio)?.text ?? 'Formulario'
          "
          :files="form.files ?? false"
          controls
          @submit="submit"
          @close="resetForm()"
          @fetch-person="findPersona"
          @fetch-business="findBusiness"
        />
      </SectionContainerComponent>
    </template>
  </PageContainerComponent>
</template>
