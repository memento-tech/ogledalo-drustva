import styled from "styled-components";
import ContextPopupModal from "../ContextPopupModal";
import PopupButtons from "../components/PopupButtons";
import { PopupMainContainer } from "../components/PopupMainContainer";
import { useEffect, useRef, useState } from "react";
import CheckedIcon from "../../icons/CheckedIcon";
import {
  deleteImages,
  getAllImages,
  uploadImage,
} from "../../adapters/ImagesAdapter";

const UploadImagesPopup = ({
  onSubmit,
  zIndex,
  closePopup,
  oneImageOnly,
  presetImages,
}) => {
  const [visibleImage, setVisibleImage] = useState(
    presetImages ? presetImages[0] : undefined
  );
  const [selectedImages, setSelectedImages] = useState(
    presetImages ? presetImages : []
  );
  const fileInputRef = useRef();
  const [availableImages, setAvailableImages] = useState();

  const deleteImage = () => {
    const formData = new FormData();
    const ids = (selectedImages || []).map((imageData) => imageData.id);

    formData.append("imageIds", ids);

    deleteImages(ids).then(() => {
      fetchAllImages();
      if (ids.includes(visibleImage.id)) {
        setVisibleImage(undefined);
      }

      setSelectedImages([]);
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      return uploadImage(formData);
    });

    await Promise.all(uploadPromises); // Waits for all uploads to finish

    fetchAllImages(); // Called only after all uploads are done
  };

  const fetchAllImages = () => {
    getAllImages().then((result) => setAvailableImages(result));
  };

  const onUploadImage = () => {
    fileInputRef.current?.click();
  };

  const addImageToSelection = async (selection) => {
    if (oneImageOnly) {
      setSelectedImages([selection]);
      setVisibleImage(selection);
    } else {
      const isAlreadySelected = selectedImages?.some(
        (img) => img.src === selection.src
      );

      if (isAlreadySelected) {
        const updated = selectedImages.filter(
          (img) => img.src !== selection.src
        );
        setSelectedImages(updated);

        if (visibleImage?.src === selection.src) {
          setVisibleImage(
            updated.length > 0 ? updated[updated.length - 1] : undefined
          );
        }
      } else {
        const updated = [...selectedImages, selection];
        setSelectedImages(updated);
        setVisibleImage(selection);
      }
    }
  };

  useEffect(() => fetchAllImages(), []);

  const getDeleteLabel = () => {
    if (selectedImages.length > 1) {
      return "Delete Images";
    } else {
      return "Delete Image";
    }
  };

  return (
    <ContextPopupModal zIndex={zIndex} onClose={closePopup}>
      <PopupMainContainer $width="600px">
        Image Upload
        <Container>
          <ImageUploadContainer>
            {visibleImage && <SelectedImage src={visibleImage.src} />}
            <PopupButtons
              buttons={[
                {
                  label: visibleImage
                    ? "Upload New Image"
                    : oneImageOnly
                    ? "Upload Image"
                    : "Upload Images",
                  onClick: onUploadImage,
                  width: "40%",
                },
                {
                  label: getDeleteLabel(),
                  onClick: deleteImage,
                  width: "40%",
                  disabled:
                    visibleImage === undefined || visibleImage === null
                      ? "disabled"
                      : "",
                },
              ]}
            />
            <input
              type="file"
              accept="image/*"
              multiple={!oneImageOnly}
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </ImageUploadContainer>
          <AvailableImages>
            {(!availableImages || availableImages.length === 0) && (
              <NoImagesLabel>There are no available images</NoImagesLabel>
            )}
            {availableImages &&
              availableImages.length > 0 &&
              availableImages.map((imageData) => (
                <AvailableImageContainer
                  onClick={() => addImageToSelection(imageData)}
                  key={imageData.id}
                >
                  {selectedImages &&
                    selectedImages.find(
                      (image) => image && image.src === imageData.src
                    ) && (
                      <Selector>
                        <CheckedIcon />
                      </Selector>
                    )}
                  <AvailableImage src={imageData.src} />
                </AvailableImageContainer>
              ))}
          </AvailableImages>
        </Container>
        <PopupButtons
          buttons={[
            {
              label: "Close",
              onClick: closePopup,
              width: "30%",
            },
            {
              label: "Select",
              onClick: () => {
                if (selectedImages && selectedImages.length > 0) {
                  onSubmit(selectedImages);
                  closePopup();
                }
              },
              width: "30%",
              disabled: !visibleImage ? "disabled" : "",
            },
          ]}
        />
      </PopupMainContainer>
    </ContextPopupModal>
  );
};

export default UploadImagesPopup;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid black;
`;

const ImageUploadContainer = styled.div`
  width: 65%;
  max-width: 60%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AvailableImages = styled.div`
  width: 30%;
  max-width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

  max-height: 300px;
  height: 300px;
  overflow: scroll;
  border-left: 1px solid #bababa;
  border-radius: 15px;
  border-bottom: 1px solid #bababa;
  border-top: 1px solid #bababa;
  padding: 0.5rem 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const AvailableImage = styled.img`
  width: 90%;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
`;

const SelectedImage = styled.img`
  width: 100%;
  max-height: 80%;
  object-fit: cover;
  border-radius: 5px;
`;

const NoImagesLabel = styled.p`
  color: #696969;
`;

const AvailableImageContainer = styled.div`
  width: 100%;
  position: relative;
`;

const Selector = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: -5px;
  left: 0;
`;
