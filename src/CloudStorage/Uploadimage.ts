export async function Uploadimage(file: File): Promise<{ url: string; publicId: string }>{
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "hamzat");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dlijiq0w3/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Image upload failed");

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};