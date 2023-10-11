<script setup lang="ts">
import { UserCreationModel } from 'src/api';
import { TipoUsuarioEmpresa } from 'src/enums/Dictionary.enum';
import { getSelectList, mapSelectList } from 'src/utils/array';
import { validators } from 'src/utils/validations';
import { ref } from 'vue';
import EmailComponent from '../ui/inputs/EmailComponent.vue';
import InputComponent from '../ui/inputs/InputComponent.vue';
import PhoneComponent from '../ui/inputs/PhoneComponent.vue';
import SelectComponent from '../ui/inputs/SelectComponent.vue';
import StandarInputComponent from '../ui/inputs/StandarInputComponent.vue';

defineProps<{
  listBussiness: object[];
  validate: boolean
}>();

const model = ref<NonNullable<UserCreationModel>>({});
</script>

<template>
  <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
    <InputComponent
      v-model="model.firstName"
      label="Primer Nombre"
      :rules="[validators.Required]"
      :validate="validate"
    />
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
    <InputComponent
      v-model="model.secondName"
      label="Segundo Nombre"
      :validate="validate"
    />
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
    <InputComponent
      v-model="model.firstLastName"
      label="Primer Apellido"
      :rules="[validators.Required]"
      :validate="validate"
    />
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
    <InputComponent
      v-model="model.secondLastName"
      label="Segundo Apellido"
      :validate="validate"
    />
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
    <StandarInputComponent
      v-model="model.userName"
      label="Nombre de Usuario"
      :rules="[validators.Required]"
      :validate="validate"
    />
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
    <StandarInputComponent
      v-model="model.password"
      label="Nombre de Usuario"
      :rules="[validators.Required]"
      :validate="validate"
      type="password"
    />
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
    <PhoneComponent
      v-model="model.phoneNumber"
      label="Número de Teléfono"
      :rules="[validators.Required]"
      :validate="validate"
    />
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
    <EmailComponent
      v-model="model.email"
      label="Correo Electrónico"
      :rules="[validators.Required]"
      :validate="validate"
    />
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
    <SelectComponent
      v-model="model.email"
      label="Intermediario"
      :rules="[validators.Required]"
      :options="mapSelectList(listBussiness, 'name', 'id')"
      :validate="validate"
    />
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
    <SelectComponent
      v-model="model.email"
      label="Tipo Usuario"
      :rules="[validators.Required]"
      :options="getSelectList(TipoUsuarioEmpresa)"
      :validate="validate"
    />
  </div>
</template>
