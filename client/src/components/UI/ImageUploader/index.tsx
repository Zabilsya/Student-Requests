import React, {FC} from 'react';
import ImageUploading, {ImageUploadingPropsType} from 'react-images-uploading';
import {FilesLoaderWrapper, FlexWrapper} from "../../styled/wrappers";
import {ImageWrapper} from "./styles";
import {red, white} from "../../../const/styles";
import {IoCloseCircle, IoImageOutline} from "react-icons/io5";
import {DocumentDeleteButton} from "../../common/Document/styles";
import {InputFileText} from "../InputFiles/styles";

const imageUploaderProps = {
    acceptType: ['jpg', 'jpeg', 'png'],
    dataURLKey: 'url'
};

interface Props extends ImageUploadingPropsType {}

export const ImageUploader: FC<Props> = ({value, onChange}) => {
    return <ImageUploading onChange={images => onChange(images)} value={value} {...imageUploaderProps}>
        {({onImageUpload, onImageRemove, errors}) => (
            <>
                {value.length > 0
                    ? (
                        <ImageWrapper image={value[0].url}>
                            <DocumentDeleteButton onClick={() => onImageRemove(0)}>
                                <IoCloseCircle
                                    size="28px"
                                    color={red}
                                    stroke={white}
                                    strokeWidth="30px"
                                />
                            </DocumentDeleteButton>
                        </ImageWrapper>
                    )
                    : (
                        <FilesLoaderWrapper type="button" onClick={onImageUpload}>
                            <FlexWrapper gap="10px">
                                <IoImageOutline size="24px" />
                                <InputFileText>Изображение для превью</InputFileText>
                            </FlexWrapper>
                        </FilesLoaderWrapper>
                    )
                }

            </>
        )}
    </ImageUploading>
};

export default ImageUploader