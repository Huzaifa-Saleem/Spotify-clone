import React, { useState } from "react";
import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
// components
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const uploadModal = useUploadModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        return toast.error("Missing Fields!");
      }

      const uniqueId = uniqid();

      // upload songs
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}.mp3`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed to upload song!");
      }

      // upload images
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}.png`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed to upload image!");
      }

      // insert into database
      const { data: insertData, error: insertError } = await supabaseClient
        .from("songs")
        .insert({
          title: values.title,
          user_id: user.id,
          author: values.author,
          image_path: imageData?.path,
          song_path: songData?.path,
        });

      if (insertError) {
        setIsLoading(false);
        return toast.error("Failed to insert into database!");
      }

      router.refresh();
      uploadModal.onClose();
      setIsLoading(false);
      reset();
      toast.success("Song uploaded successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an audio file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <div>
          <div className="pb-1">Select an Song File</div>
          <Input
            type="file"
            accept=".mp3"
            id="song"
            disabled={isLoading}
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an Image</div>
          <Input
            type="file"
            accept="image/*"
            id="image"
            disabled={isLoading}
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
