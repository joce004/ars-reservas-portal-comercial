//TODO: Hacer util generico para encapsular lo que se repite
import { BusinessUserType, UserModel, } from 'src/api';
import { $userApi } from 'src/boot/api';
import { ResolveRequestOperation } from 'src/utils/request';


export const FetchUsersList = async (params?: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  businessId?: number;
  firstNameContains?: string;
  firstLastNameContains?: string;
  businessUserType?: BusinessUserType;
}) => {
  return await ResolveRequestOperation<UserModel[]>(
    {
      request: () => $userApi.apiUsersListGet({
        businessId: params?.businessId,
        firstNameContains: params?.firstNameContains,
        firstLastNameContains: params?.firstLastNameContains,
        businessUserType: params?.businessUserType,
        rawIncludes: ['briefBusinessUsers'],
      }),
      messageError: 'No se pudo obtener el listado de usuarios.',
      payloadMutationFunc: (data) => data.sort((a, b) => {
        if (a.fullName && b.fullName) {
          if (a.fullName > b.fullName) return 1;
          if (a.fullName < b.fullName) return -1;
        }
        return 0;
      })

    });
};
