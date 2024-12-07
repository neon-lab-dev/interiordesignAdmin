/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICONS } from "../../assets";

type TUploadImageProps = {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  imagePreviews: string[];
  removeImage: (url: string) => void;
};


const UploadImage:React.FC<TUploadImageProps> = ({handleImageChange, imagePreviews, removeImage}) => {
    return (
        <div className="p-4 w-full flex flex-col gap-10">
        {/* Upload img btn */}
        <div className="h-[453px] w-[453px] border-[1px] border-border-10 rounded-xl flex justify-center items-center overflow-hidden">
          <label className="flex flex-col items-center cursor-pointer">
            <input
            required
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
              className="hidden"
            />
            <div className="bg-primary-40 p-2 rounded-xl text-white w-[253px] h-[55px] flex justify-center items-center">
              Choose Image
            </div>
          </label>
        </div>

        {/* Showing image previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-5">
          {imagePreviews.length > 0 &&
            imagePreviews.map((previewUrl:any) => (
              <div key={previewUrl} className="p-2 rounded-md border relative">
                <img onClick={() => removeImage(previewUrl)} src={ICONS.cross} alt="cros-icon" className="size-5 cursor-pointer top-2 right-2 absolute" />
                <img
                  src={previewUrl}
                  alt="image"
                  className="h-full w-full object-cover object-center rounded-md"
                />
              </div>
            ))}
        </div>
      </div>
    );
};

export default UploadImage;