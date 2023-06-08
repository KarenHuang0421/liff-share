<template>
  <div class="wrap center">
    <h1>hello world!</h1>
    <span>
      {{ form.userId }}
    </span>
    <span>
      {{ form.displayName }}
    </span>
  </div>
</template>
<script setup>
const form = ref({ userId: "", displayName: "" });
onMounted(() => {
  form.value = getLineProfile();
});

const getLineProfile = async () => {
  const { $toggleLiffPlugin } = useNuxtApp();
  const profile = await $toggleLiffPlugin();
  return profile;
};
</script>
<style lang="scss" scoped>
.wrap {
  background-color: black;
  font-weight: bold;
  height: 100vh;

  h1 {
    color: white;
    font-size: 64px;
  }
  span {
    color: #e6e6e6;
    font-size: 32px;

  }
}
</style>
