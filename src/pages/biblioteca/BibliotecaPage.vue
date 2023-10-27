<script setup lang="ts">
import { FolderResponseModel } from 'src/api';
import { $resourcesLibraryApi } from 'src/boot/api';
import FormBtnComponent from 'src/components/ui/buttom/FormBtnComponent.vue';
import PageContainerComponent from 'src/components/ui/containers/PageContainerComponent.vue';
import SectionContainerComponent from 'src/components/ui/containers/SectionContainerComponent.vue';
import InputComponent from 'src/components/ui/inputs/InputComponent.vue';
import { Loader } from 'src/utils/loading';
import { ResolveRequestOperation } from 'src/utils/request';
import { routeResolver } from 'src/utils/route-resolver';
import { computed, onMounted, ref } from 'vue';

///////////////////////////////
// DATA
///////////////////////////////

const resourcesInfo = ref<FolderResponseModel>();
const directoryRoute = ref<FolderResponseModel[]>([]);
const currentFolder = computed(() => {
  if (directoryRoute.value.length > 0) {
    return directoryRoute.value[directoryRoute.value.length - 1];
  }
  return resourcesInfo.value;
});

const searchValue = ref<string>('');
const showingByDirectory = ref<boolean>(true);

///////////////////////////////
//METHODS
///////////////////////////////

const loader = Loader;

const setFolder = (folder: FolderResponseModel) => {
  directoryRoute.value = [folder];
  searchValue.value = '';
};

const resetFolder = () => {
  showingByDirectory.value = true;
  directoryRoute.value = [];
};

const search = async () => {
  loader.showLoader('Buscando...');
  const resources = await ResolveRequestOperation<FolderResponseModel>({
    request: () =>
      $resourcesLibraryApi.apiSharedLibraryPublicGet({
        name: searchValue.value,
        viewType: 'OnlyFiles',
      }),
    }
  );
  resources?.Payload && (directoryRoute.value = [resources.Payload]);
  showingByDirectory.value = false;
  Loader.hideLoader();
};

const fetch = async () => {
  loader.showLoader('Cargando...');
  const resources = await await ResolveRequestOperation<FolderResponseModel>({
    request: () =>
      $resourcesLibraryApi.apiSharedLibraryPublicGet({
        viewType: 'Default',
      }),
    }
  );
  resources.Payload && (resourcesInfo.value = resources.Payload);
  showingByDirectory.value = true;
  Loader.hideLoader();
};

const fileIcon = (name: string) => {
  const ext = name.substring(name.indexOf('.') + 1).toLocaleLowerCase();
  let icon = '';
  switch (ext) {
    case 'csv':
      icon = 'fa-solid fa-file-csv';
      break;
    case 'json':
    case 'xml':
      icon = 'fa-solid fa-code';
      break;
    case 'excel':
    case 'excelspreadsheets':
      icon = 'fa-solid fa-file-excel';
      break;
    case 'txt':
      icon = 'fa-solid fa-file-lines';
      break;
    case 'pdf':
      icon = 'fa-solid fa-file-pdf';
      break;
    default:
      icon = 'fa-solid fa-file';
  }
  return icon;
};

///////////////////////////////
//WATCHERS
///////////////////////////////

onMounted(async () => {
  await fetch();
});
</script>

<template>
  <PageContainerComponent>
    <template #actions></template>
    <SectionContainerComponent class="flex no-wrap">
      <InputComponent
        v-model="searchValue"
        label="Buscar"
        class="fit q-pa-none"
        clearable
        hide-bottom-space
        @clear="fetch"
      />
      <FormBtnComponent
        icon="fa-solid fa-magnifying-glass"
        class="q-pa-md"
        @click="search"
      />
    </SectionContainerComponent>
    <SectionContainerComponent>
      <q-expansion-item
        class="full-width"
        header-class="q-pa-none"
        default-opened
      >
        <template #header>
          <span class="flex items-center text-h6 font-semiboldregular">
            <q-icon
              name="fa-solid fa-folder-tree"
              size="1.1rem"
              class="q-mr-sm"
            />
            Directorios
          </span>
        </template>
        <q-card>
          <q-separator class="q-my-md" />
          <div class="flex q-gutter-sm">
            <template
              v-for="(folder, folderIndex) in resourcesInfo?.folders"
              :key="folderIndex"
            >
              <div class="q-pa-md">
                <q-btn
                  flat
                  no-caps
                  hide-bottom-space
                  align="left"
                  class="q-pa-none"
                  @click="setFolder(folder)"
                >
                  <div class="subtitle1">
                    <q-icon name="fa-solid fa-folder" class="q-mr-md" />
                    {{ folder.name }}
                  </div>
                </q-btn>
              </div>
            </template>
          </div>
        </q-card>
      </q-expansion-item>
    </SectionContainerComponent>
    <template v-if="currentFolder?.files?.length || !showingByDirectory">
      <SectionContainerComponent>
        <div class="text-h6 font-semiboldregular">
          Archivos en este directorio
        </div>

        <q-separator class="q-my-md" />

        <div class="row scroll">
          <span>
            <q-btn flat padding="none" @click="resetFolder()">
              {{ resourcesInfo?.name }}
            </q-btn>
            <template v-if="showingByDirectory">
              <template
                v-for="(folder, rutatIndex) in directoryRoute"
                :key="rutatIndex"
              >
                <q-icon name="fa-solid fa-chevron-right" class="q-mx-sm" />
                <q-btn
                  flat
                  padding="none"
                  class="q-mx-sm"
                  @click="setFolder(folder)"
                >
                  {{ folder.name }}
                </q-btn>
              </template>
            </template>
          </span>
        </div>

        <q-separator class="q-my-md" />

        <div class="q-gutter-md row">
          <template v-if="!currentFolder?.files?.length && !showingByDirectory">
            <q-card
              flat
              bordered
              class="fit flex justify-center items-center q-pa-xl bg-grey-2"
            >
              <q-icon
                name="fa-solid fa-circle-exclamation"
                color="accent"
                size="md"
                class="q-pr-md"
              />
              <div class="text-h6 text-center">
                No se encontraron coincidencias.
              </div>
            </q-card>
          </template>

          <template
            v-for="(file, fileIndex) in currentFolder?.files"
            :key="fileIndex"
          >
            <q-btn
              outline
              square
              no-caps
              class="q-pa-md col-xs-4 col-sm-3 col-md-2 col-lg-1"
              :href="routeResolver(`${resourcesInfo?.name}/${file.url}`)"
              target="_blank"
            >
              <q-icon
                :name="fileIcon(file.name ?? '')"
                size="md"
                class="q-mb-sm full-width"
                color="accent"
              />
              <span style="white-space: normal; line-height: 12pt">
                {{ file.name }}
              </span>
            </q-btn>
          </template>
        </div>
      </SectionContainerComponent>
    </template>
  </PageContainerComponent>
</template>
