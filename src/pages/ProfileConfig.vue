<template>
  <q-page padding>
    <network-dependent :failed="profileFailed" :pending="profilePending">
      <div class="q-gutter-md flex flex-center q-mb-md">
        <q-file
          accept="image/*"
          :multiple="false"
          :loading="changingProfileImage"
          borderless
          hint="Click here to change your profile image."
          :input-style="{ display: 'none' }"
          @update:model-value="profileImageChanged"
        >
          <template #default>
            <q-avatar size="10em">
              <img :src="'data:image/jpg;base64,' + imageb64" />
            </q-avatar>
          </template>
        </q-file>
      </div>
      <q-input v-model="name" type="text" dense hint="Your profile name." />
      <q-input v-model="insta" type="text" dense hint="Your instagram handle." />
      <h5 class="text-center">Biography</h5>
      <content-editor v-model="bio" class="q-mt-md" />
      <save-or-discard-buttons
        @click:save="submitProfileUpdate"
        @click:discard="getProfile"
      />
    </network-dependent>
  </q-page>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import NetworkDependent from "components/NetworkDependent";
import ContentEditor from "components/ContentEditor";
import SaveOrDiscardButtons from "components/form/SaveOrDiscardButtons";

const api = getCurrentInstance().proxy.$api;

const name = ref("");
const insta = ref("");
const imageb64 = ref("");
const bio = ref([]);

const profileFailed = ref(false);
const profilePending = ref(true);
const getProfile = () => {
  profilePending.value = true;
  api
    .get("/v1/profile")
    .then((r) => {
      name.value = r.data.name;
      insta.value = r.data.insta;
      imageb64.value = r.data.image;
      bio.value = r.data.bio;
    })
    .catch(() => (profileFailed.value = true))
    .finally(() => (profilePending.value = false));
};

const fileReader = new FileReader();
const changingProfileImage = ref(false);
const profileImageChanged = (newImgFile) => {
  if (changingProfileImage.value) {
    fileReader.abort();
  }
  changingProfileImage.value = true;
  fileReader.onloadend = () => {
    const b64 = fileReader.result.replace(/^data:.+;base64,/, "");
    changingProfileImage.value = false;
    imageb64.value = b64;
  };
  fileReader.readAsDataURL(newImgFile);
};

const q = getCurrentInstance().proxy.$q;
const submittingProfile = ref(false);
const submitProfileUpdate = () => {
  submittingProfile.value = true;
  api
    .put("/v1/profile", {
      name: name.value,
      insta: insta.value,
      image: imageb64.value,
      bio: bio.value,
    })
    .then(() => {
      q.notify({ type: "positive", message: "Saved." });
    })
    .catch((e) => {
      profileFailed.value = true;
      console.err(e);
    })
    .finally((submittingProfile.value = false));
};

onMounted(() => {
  getProfile();
});
</script>
