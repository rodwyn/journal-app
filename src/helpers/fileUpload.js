export const fileUpload = async(file) => {
  // if (!file) throw new Error('Not file available.');
  if (!file) return null;

  const cloudURL = `https://api.cloudinary.com/v1_1/dzk5uwpiv/upload`;
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const response = await fetch( cloudURL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Not able to upload image.')

    const cloudResponse = await response.json();

    return cloudResponse.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
}