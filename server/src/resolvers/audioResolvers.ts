import { SoundModel } from "../models/Sound";

export const audioResolvers = {
  Query: {
    getAudios: async () => await SoundModel.find(),
    getAudioById: async (_, { id }) => await SoundModel.findById(id),
  },
  Mutation: {
    addAudio: async (_, { input }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const audio = new SoundModel({ ...input, user: user.id });
      return await audio.save();
    },
    updateAudio: async (_, { id, input }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const audio = await SoundModel.findById(id);
      if (!audio) throw new Error("Audio not found");
      if (audio.user.toString() !== user.id) throw new Error("Unauthorized");

      Object.assign(audio, input);
      return await audio.save();
    },
    deleteAudio: async (_, { id }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const audio = await SoundModel.findById(id);
      if (!audio) throw new Error("Audio not found");
      if (audio.user.toString() !== user.id) throw new Error("Unauthorized");

      await SoundModel.findByIdAndDelete(id);
      return "Audio deleted successfully";
    },
  },
};
