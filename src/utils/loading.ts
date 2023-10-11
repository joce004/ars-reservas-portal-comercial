import { Loading, QSpinnerBars } from 'quasar';

interface ILoading {
  showLoader: (text: string) => void;
  hideLoader: () => void;
  qLoading: Loading;
}

export const Loader: ILoading = {
  showLoader: (text: string) => {
    Loader.qLoading.show({
      message: text,
      spinner: QSpinnerBars,
      spinnerColor: 'white',
      messageColor: 'white',
      backgroundColor: 'primary',
      boxClass: 'font-bold text-h6',
    });
  },

  hideLoader: () => {
    Loader.qLoading.hide();
  },
  qLoading: Loading,
};
