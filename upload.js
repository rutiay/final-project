


const fileUpload = async () => {
    if (picHolder) {
      const formData = new FormData();
      formData.append("file", picHolder);
      formData.append("upload_preset", "uv3tfvmx");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/doolsewfd/image/upload",
        formData
      );
      const tempData = [...data];
      tempData[0]?.nav.forEach((element) => {
        if (element.type === "image") {
          element.value = response.data.url;
          setData(tempData);
        }
      });
    }
  };