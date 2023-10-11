import { AxiosInstance } from 'axios';
import { $axios } from 'boot/axios';
import { AccountApi } from 'src/api/api/account-api';
import { ProductApi } from 'src/api/api/product-api';
import { ResourcesLibraryApi } from 'src/api/api/resources-library-api';
import { BusinessApi } from 'src/api/api/business-api';
import { BusinessUserApi } from 'src/api/api/business-user-api';
import { UserApi } from 'src/api/api/user-api';
import { ServiceRequestApi } from 'src/api/api/service-request-api';
import { ServiceRequestTypeApi } from 'src/api/api/service-request-type-api';
import { BusinessServiceRequestTypeApi } from 'src/api/api/business-service-request-type-api';
import { RoleProfileApi } from 'src/api/api/role-profile-api';
import { RoleApi } from 'src/api/api/role-api';
import { HelpersApi } from 'src/api/api/helpers-api';
import { watch } from 'vue';

let $accountApi: AccountApi;
let $productApi: ProductApi;
let $resourcesLibraryApi: ResourcesLibraryApi;
let $userApi: UserApi;
let $businessApi: BusinessApi;
let $serviceRequestApi: ServiceRequestApi;
let $serviceRequestTypeApi: ServiceRequestTypeApi;
let $businessServiceRequestTypeApi: BusinessServiceRequestTypeApi;
let $roleProfileApi: RoleProfileApi;
let $roleApi: RoleApi;
let $businessUserApi: BusinessUserApi;
let $helpersApi: HelpersApi;

const init = (axios$: AxiosInstance) => {
  $accountApi = new AccountApi(undefined, '', axios$);
  $productApi = new ProductApi(undefined, '', axios$);
  $resourcesLibraryApi = new ResourcesLibraryApi(undefined, '', axios$);
  $userApi = new UserApi(undefined, '', axios$);
  $businessApi = new BusinessApi(undefined, '', axios$);
  $serviceRequestApi = new ServiceRequestApi(undefined, '', axios$);
  $serviceRequestTypeApi = new ServiceRequestTypeApi(undefined, '', axios$);
  $businessServiceRequestTypeApi = new BusinessServiceRequestTypeApi(
    undefined,
    '',
    axios$
  );
  $roleProfileApi = new RoleProfileApi(undefined, '', axios$);
  $roleApi = new RoleApi(undefined, '', axios$);
  $businessUserApi = new BusinessUserApi(undefined, '', axios$);
  $helpersApi = new HelpersApi(undefined, '', axios$);
};

export default () => {
  watch($axios, init, { immediate: true, deep: true });
};

export {
  $accountApi,
  $productApi,
  $resourcesLibraryApi,
  $userApi,
  $businessApi,
  $serviceRequestApi,
  $serviceRequestTypeApi,
  $businessServiceRequestTypeApi,
  $roleProfileApi,
  $roleApi,
  $businessUserApi,
  $helpersApi,
};
