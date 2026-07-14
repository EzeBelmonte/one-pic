import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/app/hooks/useAuth";
import { useUser } from "@/shared/hooks/useUser";

import { 
  configSchema, 
  type ConfigSchema 
} from "./schemas/config.schema";

import { cn } from "@/shared/utils/cn";

import { 
  Input, 
  Textarea, 
  Button, 
  AlertError, 
  Image, 
  ImageUpload, 
  ImagePreview 
} from "@/components";

const Configuration = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ConfigSchema>({
    resolver: zodResolver(configSchema),
  });

  const { user } = useAuth();
  const { updateProfile, error } = useUser();

  if (!user) {
    return <p>El usuario no existe</p>;
  }

  // Seteamos la privacidad con el valor original
  const [privacy, setPrivacy] = useState(user.isPrivate);
  
  // Guardamos la imagen seleccionada
  const [image, setImage] = useState<File | null>(null);

  // Cargamos los datos actuales del usuario en el formulario
  useEffect(() => {
    reset({
      nickname: user.nickname ?? "",
      bio: user.bio ?? "",
    });

    setPrivacy(user.isPrivate);
  }, [user, reset]);

  // Función que envia el formulario al backend
  async function onSubmit(
    data: ConfigSchema
  ) {
    // Seteamos con la privacidad elegida
    data.isPrivate = privacy;

    await updateProfile(image, data);
  }

  // Función que cambia la privacidad
  const handlePrivacy = () =>{
    setPrivacy(!privacy);
  }

  return (
    <section className="w-full flex flex-col items-center">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-[300px] flex flex-col gap-4 sm:w-[400px]"
      >
        {/* Imagen */}
        <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mx-auto">
          {!image ? (
            <Image
              src={user.profileImageUrl}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImagePreview
              file={image}
              setImage={setImage}
              className="w-full h-full"
              imageClassName="w-full h-full object-cover object-top"
              buttonClassName="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}

          {!image && (
            <ImageUpload
              onSelect={setImage}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>

        <Input
          id="nickname"
          placeholder="Nickname"
          type="text"
          error={errors.nickname?.message}
          {...register("nickname")}
        />

        <Textarea 
          id="bio"
          placeholder="Biografía"
          error={errors.bio?.message}
          className="w-[80vw] sm:w-[390px] mx-auto mb-3"
          {...register("bio")}
        />

        <div className="text-white flex gap-3">
          <p>Privacidad</p>
          <Button
            type="button"
            onClick={handlePrivacy}
            className={cn(
              `w-[100px] rounded cursor-pointer
              transition-colors duration-200`,
              privacy
                ? "bg-amber-600"
                : "bg-green-600"
            )}
          >
            {privacy ? "Privado" : "Público"}
          </Button>
        </div>

        <AlertError error={error} />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="
            w-[110px]
            border border-[#125c7a] 
            bg-[#3b8aaf] rounded
            text-white font-semibold 
            px-2 mt-10
          "
        >
          Actualizar
        </Button>
      </form>

      
    </section>
  );
}

export default Configuration;