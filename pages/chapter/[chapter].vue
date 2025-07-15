<template>
  <section>
    <div
      v-if="pending"
      class="bg-color14/90 py-24 border-b border-b-d36 rounded-b-[20px]"
    >
      <div
        class="containerClass place-items-center md:place-items-start gap-12 grid md:gap-4 md:grid-cols-12"
      >
        <!-- Skeleton for Image Section -->
        <div class="relative md:col-span-5">
          <div
            class="w-[276px] h-[365px] md:w-[300px] md:h-[400px] lg:w-[360px] lg:h-[500px] absolute bg-twoC rounded rotate-[9deg]"
          ></div>
          <div
            class="w-[270px] h-[347px] md:w-[300px] md:h-[400px] lg:w-[360px] lg:h-[500px] rounded z-10 relative bg-gray-300 animate-pulse"
          ></div>
          <div
            class="absolute z-20 top-2 md:top-4 bg-gray-300 px-2 py-1 rounded border border-gray-400 text-sm md:text-base font-medium text-gray-400 animate-pulse w-24 h-6"
          ></div>
        </div>

        <!-- Skeleton for Metadata Section -->
        <div
          class="w-full grid place-items-center md:place-items-start md:block md:col-span-7"
        >
          <div class="w-48 h-8 bg-gray-300 animate-pulse rounded mb-4"></div>
          <div class="w-24 h-6 bg-gray-300 animate-pulse rounded mb-8"></div>

          <!-- Skeleton for Metadata -->
          <div
            class="flex justify-between md:justify-start w-full gap-4 lg:gap-8 my-2 lg:my-8"
          >
            <div class="space-y-2 lg:space-y-4">
              <div class="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
              <div class="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
              <div class="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
              <div class="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
              <div class="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
            </div>
            <div class="space-y-2 lg:space-y-4">
              <div class="w-48 h-6 bg-gray-300 animate-pulse rounded"></div>
              <div class="w-48 h-6 bg-gray-300 animate-pulse rounded"></div>
              <div class="w-48 h-6 bg-gray-300 animate-pulse rounded"></div>
              <div class="w-48 h-6 bg-gray-300 animate-pulse rounded"></div>
              <div class="w-48 h-6 bg-gray-300 animate-pulse rounded"></div>
            </div>
          </div>

          <!-- Skeleton for Buttons -->
          <div class="w-full flex items-center gap-4">
            <div
              class="w-[35%] h-12 bg-gray-300 animate-pulse rounded-lg"
            ></div>
            <div
              class="w-[35%] h-12 bg-gray-300 animate-pulse rounded-lg"
            ></div>
            <div class="w-12 h-12 bg-gray-300 animate-pulse rounded-full"></div>
            <div class="w-12 h-12 bg-gray-300 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="bg-color14/90 py-24 border-b border-b-d36 rounded-b-[20px]"
    >
      <div class="containerClass">
        <div class="place-items-center gap-12 grid md:gap-4 md:grid-cols-12">
          <div class="relative md:col-span-5">
            <div
              class="w-[276px] h-[365px] md:w-[300px] md:h-[400px] lg:w-[360px] lg:h-[500px] absolute bg-twoC rounded rotate-[9deg]"
            ></div>

            <v-lazy-image
              :src="data?.data?.image"
              class="w-[270px] h-[347px] md:w-[300px] md:h-[400px] lg:w-[360px] lg:h-[500px] rounded z-10 relative"
              :alt="$t('alt.avatar')"
            />
            <div
              :class="locale === 'ar' ? 'right-2' : 'left-2'"
              class="absolute z-20 top-2 md:top-4 bg-fc px-2 py-1 rounded border border-f4 text-sm md:text-base font-medium text-two2"
            >
              {{ data?.data?.date }}
            </div>
          </div>
          <div
            class="w-full grid place-items-center md:place-items-start md:block md:col-span-7"
          >
            <p class="text-d36 text-2xl md:text-4xl font-semibold md:font-bold">
              {{ data?.data?.full_name }}
            </p>
            <PublicStars
              :value="Number(data?.data?.rate) || 0"
              color="text-white"
            />

            <!-- Metadata Section -->
            <div
              class="flex justify-between md:justify-start w-full gap-4 lg:gap-8 my-2 lg:my-8"
            >
              <div class="space-y-2 lg:space-y-4">
                <p class="font-medium capitalize text-bf text-lg">
                  {{ t("mostReading.series") }}:
                </p>
                <p class="font-medium capitalize text-bf text-lg">
                  {{ t("mostReading.writer") }}:
                </p>
                <p class="font-medium capitalize text-bf text-lg">
                  {{ t("mostReading.publisher") }}:
                </p>
                <p class="font-medium capitalize text-bf text-lg">
                  {{ t("mostReading.artist") }}:
                </p>
                <p class="font-medium capitalize text-bf text-lg">
                  {{ t("mostReading.genre") }}:
                </p>
                <p class="font-medium capitalize text-bf text-lg">
                  {{ t("mostReading.views") }}:
                </p>
              </div>
              <div class="space-y-2 lg:space-y-4">
                <nuxt-link
                  :to="localePath(`/comic/${data?.data?.comic_slug}`)"
                  class="text-white hover:border-white block w-fit cursor-pointer transition-all duration-300 border-b border-transparent capitalize font-semibold text-lg"
                >
                  {{ data?.data?.comic_full_name }}
                </nuxt-link>
                <p
                  @click="
                    getSearchLink(
                      t('mostReading.writer'),
                      data?.data?.writer?.slug
                    )
                  "
                  class="text-white hover:border-white block w-fit cursor-pointer transition-all duration-300 border-b border-transparent capitalize font-semibold text-lg"
                >
                  {{ data?.data?.writer?.name }}
                </p>
                <nuxt-link
                  :to="localePath(`/publisher/${data?.data?.publisher?.slug}`)"
                  class="text-white hover:border-white block w-fit cursor-pointer transition-all duration-300 border-b border-transparent capitalize font-semibold text-lg"
                >
                  {{ data?.data?.publisher?.name }}
                </nuxt-link>
                <p
                  v-for="(artist, index) in data?.data?.artists"
                  @click="getSearchLink(t('mostReading.artist'), artist?.slug)"
                  :key="artist?.id"
                  class="text-white inline-block hover:border-white w-fit cursor-pointer transition-all duration-300 border-b border-transparent capitalize font-semibold text-lg"
                >
                  {{ artist?.name
                  }}{{ data?.data?.artists?.length - 1 !== index ? "," : "" }}
                </p>
                <br />
                <p
                  v-for="(genre, index) in data?.data?.genres"
                  @click="getSearchLink(t('mostReading.genre'), genre?.slug)"
                  :key="genre?.id"
                  class="text-white inline-block hover:border-white w-fit cursor-pointer transition-all duration-300 border-b border-transparent capitalize font-semibold text-lg"
                >
                  {{ genre?.name
                  }}{{ data?.data?.genres?.length - 1 !== index ? "," : "" }}
                </p>

                <p
                  class="text-white block w-fit cursor-pointer transition-all duration-300 border-b border-transparent capitalize font-semibold text-lg"
                >
                  {{ data?.data?.visitor }}
                </p>
              </div>
            </div>

            <div
              class="w-full flex items-center gap-2 justify-center flex-col tooSmall:flex-row md:justify-start sm:gap-4"
            >
              <button
                :disabled="downloading"
                type="button"
                :class="
                  trnaslator === 'translator'
                    ? 'w-[40%] sm:w-[35%]'
                    : 'w-[80%] sm:w-[70%]'
                "
                @click="startDownload()"
                class="bg-fc py-3 block rounded-lg border hover:border-d36 border-white text-color14 font-semibold text-sm sm:text-[22px] leading-[24px] transition-all duration-300 hover:bg-d36 hover:text-color14"
              >
                {{
                  downloading && !run
                    ? "downloading:" + progressV2 + "%"
                    : $t("common.download")
                }}
              </button>

              <NuxtLink
                :to="
                  localePath(`/uploadchapter?chapter=${data?.data?.full_name}`)
                "
                v-if="trnaslator === 'translator'"
                class="hover:bg-d36 block text-center hover:border-d36 py-3 text-white rounded-lg border border-white hover:text-color14 w-[30%] sm:w-[35%] font-semibold text-sm sm:text-[22px] leading-[24px] transition-all duration-300"
              >
                {{ $t("common.retranslate") }}
              </NuxtLink>
              <div
                @click="toggleFavChapter(data?.data?.id)"
                class="bg-five9 text-white cursor-pointer transition-all duration-300 grid place-items-center rounded-full h-[35px] w-[35px] sm:h-[50px] sm:w-[50px]"
              >
                <UTooltip>
                  <template #text>
                    <span
                      class="before:content-[''] before:z-10 text-three0 capitalize font-semibold text-xs before:fixed before:w-0 before:h-0 before:border-b-[10px] before:border-white right-0 top-0"
                      >{{
                        data?.data?.checkFavorite
                          ? $t("common.save")
                          : $t("common.save")
                      }}</span
                    >
                  </template>
                  <Icon
                    v-if="!data?.data?.checkFavorite"
                    name="material-symbols:bookmark-outline"
                    size="1.5rem"
                    class="text-white"
                  />
                  <Icon
                    v-else
                    name="material-symbols:bookmark"
                    size="1.5rem"
                    class="text-white"
                  />
                </UTooltip>
              </div>
              <div
                @click="startShare"
                class="bg-five9 cursor-pointer grid place-items-center rounded-full h-[35px] w-[35px] sm:h-[50px] sm:w-[50px] text-white"
              >
                <UTooltip>
                  <template #text>
                    <span
                      class="before:content-[''] before:z-10 text-three0 capitalize font-semibold text-xs before:fixed before:w-0 before:h-0 before:border-b-[10px] before:border-white right-0 top-0"
                      >{{ $t("common.share") }}</span
                    >
                  </template>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m21 12l-7-7v4C7 10 4 15 3 20c2.5-3.5 6-5.1 11-5.1V19z"
                    />
                  </svg>
                </UTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="containerClass">
      <div class="w-full mt-8 rounded-lg md:mt-12 text-center">
        <!-- bookoneheader -->
        <LazyHomeGoogleAdsWithIns hydrate-on-idle />
      </div>
      <div
        data-aos="fade-left"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        data-allow-mismatch="class"
        v-if="data?.data?.orginal"
        class="my-8 rounded-[20px] bg-color14/80 space-y-4 w-[95%] mx-auto p-4 md:px-8 md:py-6"
      >
        <p class="text-white font-semibold text-2xl px-4 lg:px-8 xl:px-12">
          {{ $t("comicTranslator.about") }}
        </p>
        <div
          class="flex md:flex-row flex-col md:justify-center items-center gap-4 md:gap-8"
        >
          <NuxtLink
            :to="
              localePath(`/translator/${data?.data?.orginal?.translator?.slug}`)
            "
            class="block"
          >
            <div class="relative">
              <v-lazy-image
                :src="data?.data?.orginal?.translator?.image"
                class="w-[120px] h-[120px] border-4 border-white rounded-full object-cover"
                :placeholder="[120, 120, 5, 5]"
                :alt="$t('alt.avatar')"
              />
              <p
                class="text-d36 grid place-items-center text-sm font-semibold absolute bottom-0 left-1/2 -translate-x-1/2 border border-twoC bg-oneA/90 rounded w-[96px] h-[28px]"
              >
                {{ data?.data?.orginal?.translator?.experience_type }}
              </p>
            </div>
          </NuxtLink>

          <div class="space-y-4">
            <NuxtLink
              :to="
                localePath(
                  `/translator/${data?.data?.orginal?.translator?.slug}`
                )
              "
              class="block"
            >
              <p class="text-white font-semibold text-2xl">
                {{ data?.data?.orginal?.translator?.name }}
              </p>
            </NuxtLink>

            <div class="flex gap-4 xl:flex-row flex-col">
              <div class="flex items-center gap-2">
                <p class="text-ea font-medium text-base">
                  {{ $t("comicTranslator.translationQuality") }}
                </p>
                <PublicStarsWithoutText
                  :value="
                    Number(data?.data?.orginal?.translator?.rate_translation) ||
                    0
                  "
                />
              </div>
              <div class="flex items-center gap-2">
                <p class="text-ea font-medium text-base">
                  {{ $t("comicTranslator.imageClarity") }}
                </p>
                <PublicStarsWithoutText
                  :value="
                    Number(data?.data?.orginal?.translator?.rate_clarity) || 0
                  "
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            @click="toggleFollow(data?.data?.orginal?.translator?.id)"
            :class="
              !data?.data?.orginal?.translator?.checkFollowed
                ? 'bg-transparnet'
                : 'bg-fc'
            "
            class="flex gap-1 transition-all duration-300 items-center border broder-white hover:bg-d36 hover:border-d36 rounded-lg p-4 lg:p-6"
          >
            <p
              :class="
                !data?.data?.orginal?.translator?.checkFollowed
                  ? 'text-white'
                  : 'text-color14'
              "
              class="font-semibold text-[22px] leading-[24px]"
            >
              {{
                !data?.data?.orginal?.translator?.checkFollowed
                  ? $t("comicTranslator.followed")
                  : $t("comicTranslator.follow")
              }}
            </p>
            <p
              :class="
                !data?.data?.orginal?.translator?.checkFollowed
                  ? 'text-gray-100'
                  : 'text-five9'
              "
              class="font-medium text-sm"
            >
              ({{ data?.data?.orginal?.translator?.followers_count
              }}{{ $t("comicTranslator.followers") }})
            </p>
          </button>
        </div>
      </div>

      <div class="bg-oneA rounded px-6 py-4 my-8">
        <div
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          data-allow-mismatch="class"
          class="rounded-lg overflow-hidden"
        >
          <!-- Swiper -->
          <Swiper
            :autoHeight="true"
            :slidesPerView="slider"
            ref="swiperFullScreen"
            :spaceBetween="20"
            :modules="modules"
            @swiper="getRef"
            :lazyPreloadPrevNext="1"
            :zoom="true"
            :navigation="{
              prevEl: '.prev',
              nextEl: '.next',
            }"
            @slideChange="onSlideChange"
            class="my-swiper"
          >
            <template v-if="dataImagesimg.length">
              <SwiperSlide data-allow-mismatch="node" class="w-full h-full">
                <div
                  data-allow-mismatch="class"
                  class="swiper-zoom-container h-full w-full"
                >
                  <img
                    :src="data?.data?.image"
                    @load="handleImageLoad(0)"
                    loading="lazy"
                    :alt="$t('alt.notificationImage')"
                    class="rounded swiper-lazy"
                    :class="
                      isFullscreen ? 'w-screen h-screen' : 'h-full w-full'
                    "
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide
                v-for="(slide, index) in dataImagesimg.slice(1)"
                :key="index"
                data-allow-mismatch="node"
                class="w-full h-full"
              >
                <div
                  data-allow-mismatch="class"
                  class="swiper-zoom-container w-full h-full"
                >
                  <v-lazy-image
                    :src="slide"
                    :src-placeholder="loadImges"
                    :intersection-options="{
                      rootMargin: '0px 0px 5000px 0px',
                      threshold: 0.001,
                    }"
                    @load="handleImageLoad(index)"
                    @error="handleImageError(index)"
                    :alt="$t('alt.notificationImage')"
                    class="rounded"
                    :class="
                      isFullscreen ? 'w-screen h-screen' : 'h-full w-full'
                    "
                  />
                  <!-- <img
                    v-show="!loadingImges[index]"
                    :src="loadImges"
                    :alt="$t('alt.notificationImage')"
                    class="absolute top-0 left-0"
                    :class="
                      isFullscreen ? 'w-screen h-screen' : 'h-full w-full'
                    "
                  /> -->
                </div>
              </SwiperSlide>
            </template>
            <template v-else>
              <SwiperSlide
                v-for="(slide, index) in 6"
                :key="index"
                class="w-full h-full grid place-items-center place-content-center"
              >
                <USkeleton
                  class="w-[285px] md:w-[400px] lg:w-[879px] h-[100vh] mx-auto"
                  :ui="{ background: 'bg-gray-400' }"
                />
              </SwiperSlide>
            </template>
          </Swiper>
        </div>
        <div
          class="flex items-center mt-8 mb-4 gap-4 px-4 justify-center flex-wrap"
        >
          <div
            class="relative bg-bf rounded-[20px] cursor-pointer w-[200px] md:w-[400px] lg:w-[700px] h-2 md:h-3 lg:h-5"
          >
            <div
              class="progress-bar relative w-full h-full select-none"
              @click="onProgressClick"
              @mousedown="startDrag"
              ref="progressBar"
            >
              <div
                class="transition-all duration-300 ease-in-out absolute h-full bg-ea rounded"
                :style="{ width: progressPercentage + '%' }"
              >
                <div
                  :class="locale === 'ar' ? '-left-2' : '-right-2'"
                  class="absolute z-10 bg-white top-1/2 -translate-y-1/2 w-[15px] h-[15px] md:w-[20px] md:h-[20px] lg:w-[25px] lg:h-[25px] rounded-full shadow-newOne"
                ></div>
              </div>
            </div>
          </div>
          <div class="md:flex hidden items-center gap-1">
            <p class="text-white font-semibold md:text-xl lg:text-2xl">
              {{ currentSlide + 1 }}
            </p>
            <USelectMenu
              v-model="selected"
              searchable
              :options="
                Array.from({ length: data?.data?.num_pages }, (_, i) => i + 1)
              "
              @update:modelValue="onSlideSelect"
            />

            <p class="text-white font-semibold md:text-xl lg:text-2xl">
              {{ $t("common.of") }} {{ data?.data?.num_pages }}
            </p>
          </div>
          <div :class="$t('flex-row')" class="flex gap-1 items-center">
            <svg
              @click="prev2"
              class="hover:opacity-50 transition-all rotate-180 duration-300"
              width="19"
              height="22"
              viewBox="0 0 19 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.22705 0.499264C1.37664 0.465248 0.667969 1.14841 0.667969 2.00024V19.9992C0.667969 21.1642 1.93933 21.8843 2.93856 21.2861L17.9398 12.286C18.162 12.1526 18.3459 11.964 18.4736 11.7384C18.6012 11.5129 18.6683 11.2582 18.6683 10.999C18.6683 10.7398 18.6012 10.4851 18.4736 10.2596C18.3459 10.034 18.162 9.84541 17.9398 9.71204L2.93856 0.711867C2.723 0.582411 2.47831 0.509297 2.22705 0.499264Z"
                fill="#EAEAEA"
              />
            </svg>
            <svg
              @click="next2"
              class="hover:opacity-50 transition-all duration-300"
              width="19"
              height="22"
              viewBox="0 0 19 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.22705 0.499264C1.37664 0.465248 0.667969 1.14841 0.667969 2.00024V19.9992C0.667969 21.1642 1.93933 21.8843 2.93856 21.2861L17.9398 12.286C18.162 12.1526 18.3459 11.964 18.4736 11.7384C18.6012 11.5129 18.6683 11.2582 18.6683 10.999C18.6683 10.7398 18.6012 10.4851 18.4736 10.2596C18.3459 10.034 18.162 9.84541 17.9398 9.71204L2.93856 0.711867C2.723 0.582411 2.47831 0.509297 2.22705 0.499264Z"
                fill="#EAEAEA"
              />
            </svg>
          </div>
          <div class="flex text-white gap-1 items-center">
            <!-- Zoom In -->
            <svg
              @click="zoomIn()"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              class="cursor-pointer"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14m-1-1.5v-2h-2v-2h2v-2h2v2h2v2h-2v2z"
              />
            </svg>

            <!-- Zoom Out -->
            <svg
              @click="zoomOut()"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="cursor-pointer"
            >
              <path
                fill="currentColor"
                d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14M7 10.5v-2h5v2z"
              />
            </svg>
          </div>

          <div class="flex cursor-pointer items-center gap-1">
            <div
              @click="slider = 1"
              class="w-[20px] h-[30px] rounded border-2 border-ea hover:bg-d36 transition-all duration-300"
            ></div>
            <svg
              @click="slider = 2"
              width="36"
              class="text-ea rounded-md hover:bg-d36 transition-all duration-300"
              height="30"
              viewBox="0 0 36 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.59961"
                y="1"
                width="33"
                height="28"
                stroke="#EAEAEA"
                stroke-width="2"
              />
              <line
                x1="19.0996"
                y1="0.980469"
                x2="19.0996"
                y2="29.9805"
                stroke="#EAEAEA"
                stroke-width="2"
              />
            </svg>
          </div>
          <!-- full screen -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            @click="toggle"
            class="cursor-pointer text-white"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
              />
              <path
                fill="currentColor"
                d="M8.94 12.94a1.5 1.5 0 0 1 2.224 2.007l-.103.114L7.12 19H8.5a1.5 1.5 0 0 1 .144 2.993L8.5 22h-5a1.5 1.5 0 0 1-1.493-1.356L2 20.5v-5a1.5 1.5 0 0 1 2.993-.144L5 15.5v1.379zM20.5 2a1.5 1.5 0 0 1 1.493 1.356L22 3.5v5a1.5 1.5 0 0 1-2.993.144L19 8.5V7.121l-3.94 3.94a1.5 1.5 0 0 1-2.224-2.008l.103-.114L16.88 5H15.5a1.5 1.5 0 0 1-.144-2.993L15.5 2z"
              />
            </g>
          </svg>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        data-allow-mismatch="class"
        class="flex my-4 justify-center gap-4 items-center"
      >
        <NuxtLink
          v-if="data?.data?.link?.prev"
          :to="
            data?.data?.link?.prev
              ? localePath(`/chapter/${data?.data?.link?.prev}`)
              : localePath(`/`)
          "
          class="rounded-lg block hover:text-color14 text-base md:text-[22px] md:leading-6 text-white hover:border-d36 px-4 py-3 border border-white transition-all duration-300 hover:bg-d36"
        >
          {{ $t("prevChapter") }}
        </NuxtLink>
        <NuxtLink
          v-if="data?.data?.link?.next"
          :to="
            data?.data?.link?.next
              ? localePath(`/chapter/${data?.data?.link?.next}`)
              : localePath(`/`)
          "
          class="rounded-lg block text-color14 text-base md:text-[22px] md:leading-6 border-white px-4 py-3 border hover:border-d36 hover:bg-d36 transition-all duration-300 bg-white"
        >
          {{ $t("nextChapter") }}
        </NuxtLink>
      </div>

      <div
        v-if="data?.data?.orginal"
        class="bg-color14 rounded grid place-items-center my-8 gap-4 p-4 py-6 md:px-0"
      >
        <p class="text-white font-semibold text-2xl text-center">
          {{ $t("common.rateTranslator") }}
        </p>
        <div
          class="flex flex-col tooSmall:flex-row items-center w-full sm:w-[300px] md:w-[323px] gap-4 justify-between"
        >
          <p class="text-white text-lg font-semibold">
            {{ $t("comicTranslator.translationQuality") }}
          </p>
          <PublicStarsUser
            @stars="
              (value) =>
                testRate2(
                  'translation',
                  data?.data?.orginal?.translator?.id,
                  value
                )
            "
          />
        </div>
        <div
          class="flex items-center flex-col tooSmall:flex-row w-full sm:w-[300px] md:w-[323px] gap-4 justify-between"
        >
          <p class="text-white text-lg font-semibold">
            {{ $t("comicTranslator.imageClarity") }}
          </p>
          <PublicStarsUser
            @stars="
              (value) =>
                testRate2('clarity', data?.data?.orginal?.translator?.id, value)
            "
          />
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        data-allow-mismatch="class"
        v-if="data?.data?.orginal"
        class="flex gap-2 items-center my-8"
      >
        <p
          class="px-4 md:px-0 font-semibold md:font-bold text-white text-2xl md:text-4xl"
        >
          {{ $t("otherTranslators.title") }}
        </p>
        <hr class="flex-grow bg-seven4 text-seven4 h-[0.25px]" />
      </div>

      <div
        data-aos="flip-left"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        data-allow-mismatch="class"
        v-if="data?.data?.orginal"
        :class="{ rtl: locale === 'ar', ltr: locale !== 'ar' }"
        class="rounded-lg overflow-auto smallScrollBar border my-8 border-twoC"
      >
        <!-- Scrollable Wrapper -->
        <div
          data-aos="fade-up-left"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          data-allow-mismatch="class"
          class="max-h-[428px] min-w-[500px] lg:w-full"
        >
          <table class="table-auto border-collapse min-w-[500px] w-full">
            <!-- Table Header -->
            <thead class="sticky top-0 z-10">
              <tr
                class="bg-twoC border-t border-twoC text-white text-xs font-semibold"
              >
                <th
                  class="py-3 px-4 lg:px-6"
                  :class="locale === 'ar' ? 'text-right' : 'text-left'"
                >
                  {{ $t("Name") }}
                </th>
                <th
                  class="py-3 px-4 lg:px-6"
                  :class="locale === 'ar' ? 'text-right' : 'text-left'"
                >
                  {{ $t("Level") }}
                </th>
                <th
                  class="py-3 px-4 lg:px-6"
                  :class="locale === 'ar' ? 'text-right' : 'text-left'"
                >
                  {{ $t("Followers") }}
                </th>
                <th
                  class="py-3 px-4 lg:px-6"
                  :class="locale === 'ar' ? 'text-right' : 'text-left'"
                >
                  {{ $t("Translation Quality") }}
                </th>
                <th
                  class="py-3 px-4 lg:px-6"
                  :class="locale === 'ar' ? 'text-right' : 'text-left'"
                >
                  {{ $t("Image Clarity") }}
                </th>
              </tr>
            </thead>
            <!-- Table Body -->
            <tbody>
              <tr
                v-for="data in data?.data?.orginal?.translators"
                :key="data.id"
                @click="navigateToTranslatorDetails(data.id)"
                :class="[
                  locale === 'ar' && data.active
                    ? 'rounded-r-lg'
                    : 'rounded-l-lg',
                  data.active
                    ? 'bg-oneA cursor-pointer text-ea border-b border-t border-f4 text-sm font-medium capitalize transition-all duration-300 hover:bg-two8'
                    : 'bg-color14 cursor-pointer text-ea border-t border-twoC text-sm font-medium transition-all duration-300 hover:bg-two8 capitalize',
                ]"
              >
                <!-- Name -->
                <td class="p-6 flex items-center gap-2">
                  <div class="flex items-center gap-2">
                    <v-lazy-image
                      :src="data.image"
                      class="w-8 h-8 rounded-full"
                      width="32"
                      height="32"
                      :alt="$t('alt.avatar')"
                    />
                    <p>{{ data.name }}</p>
                  </div>
                </td>
                <!-- Level -->
                <td class="p-4 md:p-6">{{ data.experience_type }}</td>
                <!-- Followers -->
                <td class="p-6" :class="locale === 'ar' ? 'text-right' : ''">
                  {{ data.followers_count }}
                </td>
                <!-- Translation Quality -->
                <td class="p-6" :class="locale === 'ar' ? 'text-right' : ''">
                  <PublicStarsWithoutTextSmall
                    :value="Number(data.rate_translation) || 0"
                  />
                </td>
                <!-- Image Clarity -->
                <td
                  :class="
                    locale === 'ar' ? 'rounded-l-lg text-right' : 'rounded-r-lg'
                  "
                  class="p-6"
                >
                  <PublicStarsWithoutTextSmall
                    :value="Number(data.rate_clarity) || 0"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        data-aos="zoom-in-up"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        data-allow-mismatch="class"
        class="bg-oneA py-8 px-4 grid mb-12 md:mb-0 gap-4 place-items-center"
      >
        <p class="text-d36 text-2xl font-semibold">
          {{ $t("common.rateNow") }}
        </p>
        <PublicBigStarsUser
          :selected="data?.data?.rate?.my_rate"
          @stars="testRate"
        />
        <div
          data-allow-mismatch="children"
          class="flex flex-col gap-8 items-center justify-center"
        >
          <div
            class="flex items-center gap-2"
            v-for="(i, index) in data?.data?.rate?.rates"
            :key="i"
          >
            <p class="text-d36 font-semibold">
              {{ index + 1 }} {{ $t("common.stars") }}
            </p>
            <div
              class="relative overflow-hidden h-[20px] rounded-[20px] bg-white w-[183px] md:w-[225px] lg:w-[425px]"
            >
              <div
                class="absolute z-10 left-0 top-0 bg-d36 rounded-[20px] h-full"
                :style="`width:${(i / data?.data?.rate?.total).toFixed(2) * 100}%;`"
              ></div>
            </div>
            <p class="text-ea font-semibold text-lg hidden tooSmall:block">
              ({{ i }})
            </p>
          </div>
        </div>
      </div>
      <div
        data-aos="zoom-in-left"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        data-allow-mismatch="class"
        ref="outsideClick"
        class="relative w-full mt-4 mb-48"
      >
        <button
          @click="toggleDropdown"
          :class="isDropdownOpen ? 'rounded-t-md' : 'rounded-md'"
          class="flex items-center transition-all duration-300 w-full justify-between bg-oneA text-white py-4 px-4 focus:outline-none"
        >
          {{ $t("issueReportingOptions") }}
          <svg
            :class="isDropdownOpen ? 'rotate-180' : ''"
            class="ml-2 w-4 h-4 transition-all duration-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.943l3.71-3.712a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Dropdown Transition -->
        <transition name="drop">
          <div
            v-if="isDropdownOpen"
            class="absolute bg-oneA transition-all px-4 duration-300 rounded-b-md shadow-lg py-2 w-full"
          >
            <hr class="w-full h-[1px] bg-seven4" />
            <div class="py-2 z-10 space-y-4">
              <!-- Radio Options -->
              <div
                v-for="(option, index) in dropdownOptions"
                :key="index"
                class="flex items-center gap-4 cursor-pointer py-2 transition-all duration-300"
                @click="selectOption(option)"
              >
                <!-- Custom Radio Button -->
                <div
                  class="w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-300"
                  :class="{
                    'bg-d36 border-d36': selectedOption === option.slug,
                    'border-white': selectedOption !== option.slug,
                  }"
                >
                  <!-- Checkmark Icon -->
                  <svg
                    v-if="selectedOption === option.slug"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="white"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <!-- Option Text -->
                <p class="text-white font-medium">{{ option.value }}</p>
              </div>

              <!-- Others Option -->
              <div
                class="flex items-center gap-4 cursor-pointer py-2 transition-all duration-300"
                @click="selectOption('others')"
              >
                <div
                  class="w-6 h-6 min-h-6 min-w-6 border-2 rounded-full flex items-center justify-center transition-all duration-300"
                  :class="{
                    'bg-d36 border-d36': selectedOption === 'others',
                    'border-white': selectedOption !== 'others',
                  }"
                >
                  <svg
                    v-if="selectedOption === 'others'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="white"
                    class="w-4 h-4 min-w-4 min-h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p class="text-white font-medium capitalize">
                  {{ $t("common.others") }}:
                </p>
                <VeeForm
                  v-if="selectedOption === 'others'"
                  class="w-full"
                  v-slot="{ isSubmitting }"
                  @submit="submitOthers"
                >
                  <VeeField
                    :disabled="isSubmitting"
                    v-model="description"
                    name="description"
                    type="text"
                    class="mx-4 bg-transparent w-[80%] font-medium text-lg text-a0 capitalize outline-none border-b border-five9 py-1"
                    :placeholder="$t('common.writeHere')"
                    rules="required|min:15"
                  />
                  <VeeErrorMessage
                    name="description"
                    class="text-red-500 mx-4 block font-medium text-sm"
                  />
                </VeeForm>
              </div>

              <!-- Save Button -->
              <button
                :style="{ direction: locale === 'ar' ? 'rtl' : 'ltr' }"
                type="button"
                class="bg-white border border-gray-200 rounded-md transition-all duration-300 hover:bg-d36 hover:border-d36 px-3 py-2 text-sm md:text-base"
                @click="save"
              >
                {{ $t("common.save") }}
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <LazyPublicProgress
      v-if="downloading"
      :progress="Number(progress)"
      hydrate-on-idle
    />
    <LazyPublicLoading :loading="loading" hydrate-on-idle />
    <LazyConnection
      v-if="route.params.chapter && authing && downloading && run"
      :id="route.params.chapter"
      @progress="progressFun"
      hydrate-on-idle
    />
    <LazyHomeGoogleAds hydrate-on-idle />

    <LazyPublicDownload
      v-if="downloading && !run"
      :active="progressV2 !== 100"
      :fileName="data.data.full_name"
      :progress="progressV2"
      :totalBytes="totalBytesV2"
      :processedBytes="receivedBytesV2"
      hydrate-on-idle
    />
  </section>
</template>

<script setup>
const downloading = ref(false);
const authing = useCookie("authToken");
const loadingImges = ref([]);

import loadImges from "@/assets/loading.svg";
import VLazyImage from "v-lazy-image";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Zoom, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";

definePageMeta({
  layout: "default",
});

const nuxtApp = useNuxtApp();
const isReady = ref(false);
nuxtApp.hook("app:mounted", () => {
  isReady.value = true;
});

const localePath = useLocalePath();

const { locale, t } = useI18n();

const modules = [Zoom, Navigation, Pagination];
// const modules2 = [Navigation];

const swiperRef = ref(null);
const swiperFullScreen = ref(null);

// Carousel state
const currentSlide = ref(0);
const totalSlides = ref(5);

// Update when slide changes
const onSlideChange = (swiper) => {
  currentSlide.value = swiper.activeIndex;
};

const activeImageLoads = ref(new Set()); // Track active image load operations

const handleImageLoad = async (index) => {
  // Skip image loading if downloading is in progress
  if (downloading.value) {
    return;
  }

  if (!loadingImges.value[index]) {
    loadingImges.value[index] = true;

    // Add this operation to our tracking set
    const operationId = Symbol();
    activeImageLoads.value.add(operationId);

    const preloadImage = (i) => {
      return new Promise((resolve, reject) => {
        // Skip if component is unmounted or downloading started
        if (!activeImageLoads.value.has(operationId)) {
          return reject(new Error("Component unmounted"));
        }

        // Check again in case downloading started while we were setting up
        if (downloading.value) {
          return reject(new Error("Downloading in progress"));
        }

        const image = new Image();
        image.src = dataImagesimg.value[i];
        console.log(`Preloading: ${image.src}`);

        image.onload = () => {
          if (activeImageLoads.value.has(operationId) && !downloading.value) {
            loadingImges.value[i] = true;
            resolve();
          }
        };

        image.onerror = () => {
          console.error(`Failed to preload image at index ${i}`);
          reject(new Error(`Failed to load image at index ${i}`));
        };
      });
    };

    try {
      // Check if window is already loaded
      if (document.readyState === "complete") {
        // If already loaded, start preloading immediately
        for (let i = index + 1; i < dataImagesimg.value.length; i++) {
          if (
            !loadingImges.value[i] &&
            activeImageLoads.value.has(operationId) &&
            !downloading.value
          ) {
            await preloadImage(i);
          }
        }
      } else {
        // If not loaded yet, wait for load event
        await new Promise((resolve) => {
          window.addEventListener("load", resolve, { once: true });
        });
        // Then start preloading
        for (let i = index + 1; i < dataImagesimg.value.length; i++) {
          if (
            !loadingImges.value[i] &&
            activeImageLoads.value.has(operationId) &&
            !downloading.value
          ) {
            await preloadImage(i);
          }
        }
      }
    } catch (error) {
      if (
        error.message !== "Component unmounted" &&
        error.message !== "Downloading in progress"
      ) {
        console.warn(`Skipping failed preload: ${error.message}`);
      }
    } finally {
      // Clean up
      activeImageLoads.value.delete(operationId);
    }
  }
};

// Watch downloading status to resume loading when download completes
watch(downloading, (newVal) => {
  if (!newVal) {
    // When download finishes, resume image loading
    // Find the first unloaded image and start from there
    const firstUnloadedIndex = loadingImges.value.findIndex(
      (loaded) => !loaded
    );
    if (firstUnloadedIndex !== -1) {
      handleImageLoad(firstUnloadedIndex);
    }
  }
});

// Clean up when component unmounts
onUnmounted(() => {
  // Clear all active image load operations
  activeImageLoads.value.clear();
});

const handleImageError = (index) => {
  console.error(`Failed to load image at index ${index}`);
  if (index < dataImagesimg.value.length - 1) {
    const nextImage = new Image();
    nextImage.src = dataImagesimg.value[index + 2];
  }
};

const selected = computed({
  get: () => currentSlide.value + 1, // Display as 1-based index
  set: (value) => {
    currentSlide.value = value - 1; // Convert back to 0-based for internal use
  },
});

const onSlideSelect = (value) => {
  const swiper = swiperRef.value;
  const newIndex = value - 1;
  swiper.slideTo(newIndex);
  currentSlide.value = newIndex;
};

const { toggle, isFullscreen } = useFullscreen(swiperFullScreen);

const slider = ref(1);

const getRef = (swiperInstance) => {
  swiperRef.value = swiperInstance;
};
// Keyboard navigation for slides
const handleKeyDown = (e) => {
  // Only handle arrow keys
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
    return;
  }

  // Prevent default scrolling behavior
  e.preventDefault();

  const swiper = swiperRef.value;
  if (!swiper) return;

  switch (e.key) {
    case "ArrowLeft":
      if (locale.value === "ar") {
        if (currentSlide.value < data.value?.data?.num_pages - 1) {
          swiper.slideNext();
        }
      } else {
        if (currentSlide.value > 0) {
          swiper.slidePrev();
        }
      }
      break;
    case "ArrowUp":
      // Next slide (forward)
      if (currentSlide.value < data.value?.data?.num_pages - 1) {
        swiper.slideNext();
      }
      break;
    case "ArrowRight":
      if (locale.value === "en") {
        if (currentSlide.value < data.value?.data?.num_pages - 1) {
          swiper.slideNext();
        }
      } else {
        if (currentSlide.value > 0) {
          swiper.slidePrev();
        }
      }
      break;
    case "ArrowDown":
      // Previous slide (backward)
      if (currentSlide.value > 0) {
        swiper.slidePrev();
      }
      break;
  }
};

// Add event listener when component mounts
onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

// Clean up event listener when component unmounts
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

// Zoom In
const zoomIn = () => {
  const swiper = swiperRef.value;

  if (swiper?.zoom) {
    swiper.zoom.in();
  }
};

// Zoom Out
const zoomOut = () => {
  const swiper = swiperRef.value;

  if (swiper?.zoom) {
    swiper.zoom.out();
  }
};

const options = ref({
  title: "Share",
  text: "share the text",
  url: "www.megatron-soft.com",
});

const { share, isSupported } = useShare(options);
const { text, isSupported: isCopy, copy } = useClipboard();

function startShare() {
  if (isSupported.value) {
    return share().catch((err) => err);
  } else if (isCopy.value) {
    copy(`https://www.ysk-comics.com${route.fullPath}`);
    toast.add({
      title: t("copiedSuccessful"),
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
  }
}

const prev2 = () => {
  if (currentSlide.value <= 0) return;
  if (swiperRef.value && currentSlide.value > 0) {
    currentSlide.value -= 1;
    swiperRef.value.slideTo(currentSlide.value);
  }
};

const next2 = () => {
  if (swiperRef.value && currentSlide.value < data.value?.data?.num_pages - 1) {
    currentSlide.value += 1;
    swiperRef.value.slideTo(currentSlide.value);
  }
  if (currentSlide.value >= data.value?.data?.num_pages) {
    return;
  }
};

const getSearchLink = async (filterType, filterValue) => {
  const filterMap = {
    [t("mostReading.writer")]: "writer",
    [t("mostReading.publisher")]: "publisher",
    [t("mostReading.artist")]: "artist",
    [t("mostReading.genre")]: "genre",
  };

  const filterKey = filterMap[filterType];
  if (filterKey) {
    await navigateTo({
      path: localePath("/search"),
      query: { [filterKey]: filterValue },
    });
  }
};

const trnaslator = useCookie("type");

const config = useRuntimeConfig();
const url = config.public.ConstUrl;

const { setLogin } = useLogined();

const route = useRoute();
const idVal = route.params.chapter;

const handleBackendErrors = (response) => {
  if (response?.errors) {
    Object.entries(response.errors).forEach(([field, messages]) => {
      messages.forEach((message) => {
        toast.add({
          title: message,
          type: "error",
          icon: "i-icon-park-outline-error",
          color: "red",
        });
      });
    });
  } else if (response?.message) {
    // Generic message for errors without a structured `errors` field
    toast.add({
      title: response.message,
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  } else {
    // Unknown error structure
    toast.add({
      title: "An unknown error occurred. Please try again.",
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  }
};

const tranlatorId = ref(route?.query?.translatorId);
const { data, pending, refresh, error } = await useLazyFetch(
  computed(
    () =>
      `${url}/chapters/${idVal}${tranlatorId.value ? "?translator_id=" + tranlatorId.value : ""}`
  ),
  {
    headers: {
      "X-Localization": locale.value,
      Authorization: `Bearer ${useCookie("authToken").value}`,
    },
  }
);
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const progress = ref(0);
const progressV2 = ref(0);
const loading = ref(false);
const run = ref(false);

const progressFun = async (val) => {
  progress.value = val;
  if (progress.value === 100) {
    await download(); // Download the file when preparation is complete
    downloading.value = false;
    run.value = false;
    loading.value = false;
  }
};

const startDownload = async () => {
  try {
    if (!useCookie("authToken").value) {
      toast.add({
        title: t("loginFirst"),
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
      setLogin(route.path);
      await navigateTo({
        path: localePath("/login"),
      });
      return;
    }

    downloading.value = true;
    loading.value = true;

    // First check if file exists
    const responseApi = await $fetch(
      `${url}/chapters/${route.params.chapter}/check-pdf${tranlatorId.value ? "?translator_id=" + tranlatorId.value : ""}`,
      {
        method: "GET",
        headers: {
          "X-Localization": locale.value,
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
      }
    );

    loading.value = false;
    console.log(responseApi.data.status);
    if (responseApi?.data?.status) {
      await download(); // Download the file when preparation is complete
    } else {
      run.value = true;
    }
  } catch (error) {
    downloading.value = false;
    loading.value = false;
    run.value = false;
    console.error(error.message);
    handleBackendErrors(error?.data || { message: error.message });
  }
};

const totalBytesV2 = ref(0);
const receivedBytesV2 = ref(0);
const download = async () => {
  try {
    if (!useCookie("authToken").value) {
      toast.add({
        title: t("loginFirst"),
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
      setLogin(route.path);
      await navigateTo({
        path: localePath("/login"),
      });
      return;
    }

    downloading.value = true;
    // loading.value = true;

    // First check if file exists and get file info
    const fileInfo = await $fetch(
      `${url}/chapters/${route.params.chapter}/download-pdf${tranlatorId.value ? "?translator_id=" + tranlatorId.value : ""}`,
      {
        method: "HEAD",
        headers: {
          "X-Localization": locale.value,
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
      }
    );

    // If HEAD request succeeds, proceed with download
    const response = await fetch(
      `${url}/chapters/${route.params.chapter}/download-pdf${tranlatorId.value ? "?translator_id=" + tranlatorId.value : ""}`,
      {
        headers: {
          "X-Localization": locale.value,
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the content length for progress tracking
    const contentLength = response.headers.get("Content-Length");
    const totalBytes = parseInt(contentLength || "0", 10);
    let receivedBytes = 0;
    totalBytesV2.value = totalBytes;

    // Create a reader for the response body
    const reader = response.body.getReader();

    // Create chunks array to collect data
    const chunks = [];

    // Read chunks of data
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      receivedBytes += value.length;
      receivedBytesV2.value = receivedBytes;

      // Update progress if we know the total size
      if (totalBytes > 0) {
        progressV2.value = Math.round((receivedBytes / totalBytes) * 100);
      }
    }

    // Combine all chunks into a single Blob
    const blob = new Blob(chunks, { type: "application/pdf" });

    // Create filename
    const filename = `${data.value.data.full_name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`;

    // Trigger download
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);

    toast.add({
      title: t("downloadSuccessful"),
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
  } catch (error) {
    downloading.value = false;
    loading.value = false;
    run.value = false;
    console.error("Download failed:", error);
    handleBackendErrors(error?.data || { message: error.message });
  } finally {
    downloading.value = false;
    loading.value = false;
    run.value = false;
  }
};

const dataImagesimg = ref([]);
const {
  data: dataImages,
  pending: pendingImages,
  refresh: refreshImages,
} = await useLazyFetch(
  computed(
    () =>
      `${url}/chapters/${idVal}/images${tranlatorId.value ? "?translator_id=" + tranlatorId.value : ""}`
  ),
  {
    headers: {
      "X-Localization": locale.value,
    },
    onResponse: ({ response }) => {
      if (response?._data?.data) {
        dataImagesimg.value = response?._data?.data;
        totalSlides.value = response?._data?.data?.length || 0;
        loadingImges.value = new Array(response?._data?.data?.length - 1).fill(
          false
        );
      } else {
        dataImagesimg.value = [];
        totalSlides.value = 0;
        loadingImges.value = [false];
      }
    },
  }
);

watch(tranlatorId, async () => {
  await Promise.all([refresh(), refreshImages()]);
});
const toast = useToast();

const toggleFavChapter = async (id) => {
  try {
    if (useCookie("authToken").value) {
      const { data: dataval } = await useLazyFetch(
        `${url}/favorites/toggle-chapter`,
        {
          method: "POST",
          server: false,
          headers: {
            "X-Localization": locale.value,
            "Content-Type": "application/json",
            Authorization: `Bearer ${useCookie("authToken").value}`,
          },
          body: JSON.stringify({
            chapter_id: id,
          }),
        }
      );

      if (dataval.value.status) {
        data.value.data.checkFavorite = !data.value.data.checkFavorite;

        toast.add({
          title: dataval.value.message || "Saved successful!",
          type: "success",
          icon: "i-heroicons-check-badge",
          color: "green",
        });
      }
    } else {
      toast.add({
        title: t("loginFirst"),
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
      setLogin(route.path);
      await navigateTo({
        path: localePath("/login"),
      });
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};

const toggleFollow = async (id) => {
  try {
    if (useCookie("authToken").value) {
      const { data: dataVal } = await useLazyFetch(`${url}/followers`, {
        method: "POST",
        server: false,
        headers: {
          "X-Localization": locale.value,
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
        body: JSON.stringify({
          translator_id: id,
        }),
      });

      if (dataVal.value.status) {
        data.value.data.orginal.translator.checkFollowed =
          !data.value.data.orginal.translator.checkFollowed;

        toast.add({
          title: dataVal.value.message || "Saved successful!",
          type: "success",
          icon: "i-heroicons-check-badge",
          color: "green",
        });
      }
    } else {
      toast.add({
        title: t("loginFirst"),
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
      setLogin(route.path);
      await navigateTo({
        path: localePath("/login"),
      });
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};

const navigateToTranslatorDetails = async (id) => {
  await navigateTo({
    path: localePath(`/chapter/${idVal}`),
    query: { translatorId: id },
  });
};

const testRate = async (value) => {
  try {
    if (useCookie("authToken").value) {
      const { data: datakjs } = await useLazyFetch(
        `${url}/chapters/${idVal}/rate`,
        {
          method: "POST",
          server: false,
          headers: {
            "X-Localization": locale.value,
            "Content-Type": "application/json",
            Authorization: `Bearer ${useCookie("authToken").value}`,
          },
          body: JSON.stringify({
            rate: value,
          }),
        }
      );

      if (datakjs.value.status) {
        data.value.data.rate.avg_rate = datakjs.value.data.rate.avg_rate;
        data.value.data.rate.my_rate = datakjs.value.data.rate.my_rate;
        data.value.data.rate.total = datakjs.value.data.rate.total;
        // Reset data.value.data.rate.rates with datakjs.value.data.rate.rates
        console.log("before:" + datakjs.value.data.rate.rates);

        data.value.data.rate.rates = [...datakjs.value.data.rate.rates];

        // Optionally, you can log the result to verify
        console.log("after:" + data.value.data.rate.rates);

        toast.add({
          title: datakjs.value.message || "Saved successful!",
          type: "success",
          icon: "i-heroicons-check-badge",
          color: "green",
        });
      }
    } else {
      toast.add({
        title: t("loginFirst"),
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
      setLogin(route.path);
      await navigateTo({
        path: localePath("/login"),
      });
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};
const testRate2 = async (type, id, value) => {
  try {
    if (useCookie("authToken").value) {
      const { data: dataVal } = await useLazyFetch(
        `${url}/chapters/${idVal}/rate-translator`,
        {
          method: "POST",
          server: false,
          headers: {
            "X-Localization": locale.value,
            "Content-Type": "application/json",
            Authorization: `Bearer ${useCookie("authToken").value}`,
          },
          body: JSON.stringify({
            rate: value.value,
            translator_id: id,
            type: type,
          }),
        }
      );

      if (dataVal.value.status) {
        toast.add({
          title: dataVal.value.message || "Saved successful!",
          type: "success",
          icon: "i-heroicons-check-badge",
          color: "green",
        });
      }
    } else {
      toast.add({
        title: t("loginFirst"),
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
      setLogin(route.path);
      await navigateTo({
        path: localePath("/login"),
      });
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};

const outsideClick = ref(null);
const isDropdownOpen = ref(false);
const selectedOption = ref(null);
const description = ref();

const dropdownOptions = ref([
  {
    value: t("typosOrGrammaticalErrors"),
    slug: "Typos or grammatical errors",
  },
  { value: t("translationIssues"), slug: "Translation issues" },
  { value: t("blurryImages"), slug: "Blurry images" },
]);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectOption = (option) => {
  if (option === "others") {
    selectedOption.value = "others";
  } else {
    selectedOption.value = option.slug;
  }
};

const submitOthers = async (values) => {
  description.value = values.description;
  if (!selectedOption.value) {
    toast.add({
      title: t("common.selectOption"),
      type: "error",
      icon: "i-heroicons-check-badge",
      color: "red",
    });
    return;
  }

  const payload = {
    translator_id: data.value?.data?.orginal?.translator?.id,
    type: selectedOption.value,
  };

  if (selectedOption.value === "others") {
    if (!description.value) {
      toast.add({
        title: t("common.descriptionRequired"),
        type: "error",
        icon: "i-heroicons-check-badge",
        color: "red",
      });
      return;
    }
    payload.description = description.value;
  }

  try {
    if (useCookie("authToken").value) {
      const { data: response, error } = await useLazyFetch(
        `${url}/chapters/${idVal}/complaints`,
        {
          server: false,
          method: "POST",
          headers: {
            "X-Localization": locale.value,
            "Content-Type": "application/json",
            Authorization: `Bearer ${useCookie("authToken").value}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.value?.status) {
        toast.add({
          title: response.value.message || "Saved successful!",
          type: "success",
          icon: "i-heroicons-check-badge",
          color: "green",
        });
        isDropdownOpen.value = false;
      } else {
        toast.add({
          title: error.value.data.message,
          type: "success",
          icon: "i-heroicons-check-badge",
          color: "green",
        });
      }
    } else {
      toast.add({
        title: t("loginFirst"),
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
      setLogin(route.path);
      await navigateTo({
        path: localePath("/login"),
      });
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};

const save = async () => {
  if (!selectedOption.value) {
    toast.add({
      title: t("common.selectOption"),
      type: "error",
      icon: "i-heroicons-check-badge",
      color: "red",
    });
    return;
  }

  const payload = {
    translator_id: data.value?.data?.orginal?.translator?.id,
    type: selectedOption.value,
    // id: data.value?.data?.id,
  };

  if (selectedOption.value === "others") {
    if (!description.value) {
      toast.add({
        title: t("common.descriptionRequired"),
        type: "error",
        icon: "i-heroicons-check-badge",
        color: "red",
      });
      return;
    }
    payload.description = description.value;
  }

  try {
    if (useCookie("authToken").value) {
      const { data: response, error } = await useLazyFetch(
        `${url}/chapters/${idVal}/complaints`,
        {
          server: false,
          method: "POST",
          headers: {
            "X-Localization": locale.value,
            "Content-Type": "application/json",
            Authorization: `Bearer ${useCookie("authToken").value}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.value?.status) {
        toast.add({
          title: response.value.message || "Saved successful!",
          type: "success",
          icon: "i-heroicons-check-badge",
          color: "green",
        });
        isDropdownOpen.value = false;
      } else {
        toast.add({
          title: error.value.data.message,
          type: "success",
          icon: "i-heroicons-check-badge",
          color: "green",
        });
      }
    } else {
      toast.add({
        title: t("loginFirst"),
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
      setLogin(route.path);
      await navigateTo({
        path: localePath("/login"),
      });
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};

// Close dropdown when clicking outside
onClickOutside(outsideClick, () => (isDropdownOpen.value = false));

// Compute progress percentage
const progressPercentage = computed(
  () => (currentSlide.value / (data.value?.data?.num_pages - 1)) * 100
);

// Handle progress bar click
const onProgressClick = (event) => {
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const newSlideIndex = Math.round(
    (clickX / progressBar.offsetWidth) * (data.value?.data?.num_pages - 1)
  );
  currentSlide.value = newSlideIndex;
  swiperRef.value.slideTo(currentSlide.value);
};

// Drag to navigate
let isDragging = false;
const startDrag = (event) => {
  isDragging = true;
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", endDrag);
};

const onDrag = (event) => {
  if (!isDragging) return;
  const progressBar = document.querySelector(".progress-bar");
  const rect = progressBar.getBoundingClientRect();
  const dragX = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
  const newSlideIndex = Math.round(
    (dragX / rect.width) * (data.value?.data?.num_pages - 1)
  );
  currentSlide.value = newSlideIndex;
  swiperRef.value.slideTo(newSlideIndex);
};

const endDrag = () => {
  isDragging = false;
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", endDrag);
};

useHead({
  meta: [
    {
      name: "robots",
      content: "noindex, nofollow",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `https://www.ysk-comics.com/en/comic/${data.value?.data?.comic_slug}`,
    },
  ],
});

// SEO Meta Tags
useHead({
  title: computed(
    () =>
      `${data.value?.data?.full_name} - ${data.value?.data?.comic_full_name} Chapter`
  ),
  meta: [
    {
      name: "description",
      content: computed(
        () =>
          `Read ${data.value?.data?.full_name} of ${data.value?.data?.comic_full_name} online. ${data.value?.data?.genres?.map((g) => g.name).join(", ")} manga.`
      ),
    },
    {
      name: "keywords",
      content: computed(
        () =>
          `${data.value?.data?.full_name}, ${data.value?.data?.comic_full_name}, ${data.value?.data?.writer?.name}, ${data.value?.data?.genres?.map((g) => g.name).join(", ")}, manga, comic, read online`
      ),
    },
    {
      property: "og:title",
      content: computed(
        () =>
          `${data.value?.data?.full_name} - ${data.value?.data?.comic_full_name}`
      ),
    },
    {
      property: "og:description",
      content: computed(
        () =>
          `Read ${data.value?.data?.full_name} of ${data.value?.data?.comic_full_name}`
      ),
    },
    { property: "og:image", content: computed(() => data.value?.data?.image) },
    {
      property: "og:url",
      content: computed(() => `https://www.ysk-comics.com${route.fullPath}`),
    },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
.v-lazy-image {
  filter: blur(5px);
  transition: filter 1.6s;
  will-change: filter;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
