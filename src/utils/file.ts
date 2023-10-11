export function blobToBase64(
  blob: Blob,
  includeContentDisposition = false
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      let result = reader.result;
      if (!includeContentDisposition) {
        const onlyBase64 = result?.toString().split(',')[1];
        result = onlyBase64 || result;
      }
      resolve(result);
    };
    reader.readAsDataURL(blob);
  });
}

export function base64toFile(
  dataurl:string,
  filename:string,
  contentType?: string
): File {
  const arr = dataurl.split(',')
  let mime;
  if (arr.length > 1) {
    mime = arr[0].match(/:(.*?);/)?.[1];
  } else {
    mime = contentType || '';
  }
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}
