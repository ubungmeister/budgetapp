import { ChangeEvent, useRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { toast } from 'react-toastify';

type FormData = {
  email: string;
  avatar: string | null;
  name: string;
};
type InputFieldProps = {
  name: keyof FormData;
  avatar: string | null;
  setAvatar: (value: React.SetStateAction<string | null>) => void;
};

const AvatarInputField = ({ name, avatar, setAvatar }: InputFieldProps) => {
  const profileInputRef = useRef(null);
  const profilePreviewRef = useRef(null);

  const onChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];

    if (file) {
      if (file.size / 1024 / 1024 > 5) {
        toast.error('Max file size 5Mpx');
        // add message
      } else if (
        !file.type.startsWith('image/jpeg') &&
        !file.type.startsWith('image/png') &&
        !file.type.startsWith('image/jpg')
      ) {
        toast.error('Please choose jpeg/jpg/png');
      } else {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          (profilePreviewRef.current as any).src = reader.result;
          setAvatar(reader.result as string);
        });

        reader.readAsDataURL(file as Blob);
      }
    }
  };

  return (
    <div className="flex flex-row  space-x-4 pb-5">
      <div className="w-20 h-20">
        <img
          className=" rounded-full "
          src={
            avatar ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/560px-Default_pfp.svg.png'
          }
          alt="Avatar"
          ref={profilePreviewRef}
        />
      </div>
      <label className="flex w-full h-20 border rounded-md justify-center items-center text-center">
        <div className="flex flex-col justify-center items-center ">
          <FiUploadCloud className="text-[#459ca7] text-2xl border rounded-full p-1 hover:bg-gray-50" />
          <p className="text-sm text-gray-600">Click to upload PNG or JPG</p>
          <input
            id={name}
            type="file"
            className="hidden"
            ref={profileInputRef}
            onChange={onChangePicture}
          />
        </div>
      </label>
    </div>
  );
};

export default AvatarInputField;
