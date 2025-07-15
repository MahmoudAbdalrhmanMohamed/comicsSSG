<template>
  <div class="space-y-2 mb-4" ref="dropdownRef">
    <!-- Dropdown Header -->
    <div
      @click="toggleDropdown"
      class="bg-two2 cursor-pointer rounded-lg transition-all duration-300 px-4 py-2 flex items-center justify-between w-full text-lg font-medium text-ea capitalize"
    >
      <p>{{ title }}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :class="isOpen ? 'rotate-180' : ''"
        width="18"
        class="transition-all duration-300"
        height="18"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"
        />
      </svg>
    </div>

    <!-- Form Section with Transition -->
    <transition name="slide-fade">
      <div
        v-if="isOpen"
        class="transition-all duration-300 flex flex-col space-y-4"
      >
        <!-- Input Field for Search -->
        <!-- <VeeForm v-auto-animate @submit="handleSubmit" class="flex flex-col">
          <VeeField
            v-model="searchQuery"
            :name="fieldName"
            rules="alphaNum|min:2|max:100"
            class="w-[238px] outline-none px-2 mx-2 h-[48px] rounded-lg text-five9 text-base font-medium bg-ea"
            :placeholder="`${$t('Search')} ${title}`"
            type="text"
          />
          <VeeErrorMessage
            :name="fieldName"
            class="text-sm font-medium text-red-500"
          />
        </VeeForm> -->

        <!-- USelectMenu for Displaying Search Results -->
        <div>
          <USelectMenu
            v-model="selectedItem"
            :searchable="search"
            multiple
            size="xl"
            :options="options"
            option-attribute="name"
            :placeholder="`${$t('select')} ${title}`"
            @change="handleSelect"
          />
        </div>
      </div>
    </transition>

    <!-- Items Section with Transition -->
    <transition-group
      name="list-fade"
      tag="div"
      v-if="localFilterArr.length && isOpen"
      class="flex gap-2 items-center flex-wrap mx-2"
    >
      <div
        v-for="(item, index) in localFilterArr"
        :key="index"
        class="bg-two2 border border-three0 rounded flex gap-1 items-center"
      >
        <p class="text-d36 font-medium text-base p-2">
          {{ item[index].name ? item[index].name : item }}
        </p>
        <svg
          class="cursor-pointer"
          @click="removeItem(index)"
          width="28"
          height="44"
          viewBox="0 0 28 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.9375 0H23.8768C26.086 0 27.8768 1.79086 27.8768 4V40C27.8768 42.2091 26.086 44 23.8768 44H0.9375V0Z"
            fill="#303030"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.15729 26.1892C9.01656 26.3299 8.9375 26.5208 8.9375 26.7198C8.9375 26.9188 9.01656 27.1097 9.15729 27.2504C9.29802 27.3912 9.48889 27.4702 9.68792 27.4702C9.88694 27.4702 10.0778 27.3912 10.2185 27.2504L14.4073 23.0602L18.5968 27.2497C18.7382 27.3863 18.9277 27.4619 19.1243 27.4602C19.321 27.4585 19.5091 27.3796 19.6482 27.2406C19.7872 27.1015 19.8661 26.9134 19.8678 26.7167C19.8695 26.5201 19.7939 26.3306 19.6573 26.1892L15.4678 21.9997L19.6573 17.8102C19.7979 17.6695 19.8769 17.4786 19.8768 17.2797C19.8767 17.0807 19.7976 16.8899 19.6569 16.7493C19.5162 16.6087 19.3254 16.5297 19.1264 16.5298C18.9275 16.5299 18.7367 16.609 18.596 16.7497L14.4073 20.9392L10.2178 16.7497C10.0763 16.6131 9.88689 16.5375 9.69024 16.5392C9.49359 16.5409 9.30548 16.6198 9.16643 16.7588C9.02737 16.8979 8.9485 17.086 8.94679 17.2826C8.94508 17.4793 9.02067 17.6687 9.15729 17.8102L13.3468 21.9997L9.15729 26.1892Z"
            fill="#EAEAEA"
          />
        </svg>
      </div>
    </transition-group>

    <!-- Separator -->
    <svg
      class="w-full h-[2px] my-4"
      viewBox="0 0 270 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M270 2H0V0H270V2Z"
        fill="#1A1A1A"
      />
    </svg>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const route = useRoute();

const props = defineProps({
  title: String,
  fieldName: String,
  filterArr: Array,
});

const emit = defineEmits(["update:filterArr"]);

const isOpen = ref(false);
const dropdownRef = ref(null);
const selectedItem = ref(null); // Selected item from USelectMenu
const options = ref([]); // Options for USelectMenu
const searchQuery = ref(""); // Search query for fetch search

// Automatically open the dropdown if the corresponding filter is active
if (route.query[props.fieldName]) {
  isOpen.value = true;
}

// Toggle dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Close dropdown when clicking outside
onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});

const config = useRuntimeConfig();
const url = config.public.ConstUrl;

const search = async (q) => {
  if (q.length > 2) {
    const apiUrl = `${url}/filter/${props.fieldName.toLowerCase()}s?name=${q}`;
    try {
      const response = await $fetch(apiUrl, {
        headers: {
          "X-Localization": locale.value,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  } else {
    return [];
  }
};

const localFilterArr = ref([...props.filterArr]);

const handleSelect = (items) => {
  items.forEach((item) => {
    // Check if the item's slug already exists in the localFilterArr
    if (!localFilterArr.value.some((i) => i === item.slug)) {
      localFilterArr.value.push(item.slug); // Update local copy
      emit("update:filterArr", localFilterArr.value); // Emit to parent
    }
  });
};

const removeItem = (index) => {
  localFilterArr.value.splice(index, 1); // Modify local copy
  selectedItem.value = [...localFilterArr.value];

  emit("update:filterArr", localFilterArr.value); // Emit to parent
};
watch(
  () => props.filterArr,
  (newVal) => {
    localFilterArr.value = [...newVal];
  }
);
</script>

<style scoped>
/* Slide Fade Transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* List Fade Transition */
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.3s ease;
}
.list-fade-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}
.list-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
