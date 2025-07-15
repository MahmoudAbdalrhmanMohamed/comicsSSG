<template>
  <section>
    <!-- Skeleton Loader for Comic Data -->
    <div
      v-if="loadingComic"
      class="bg-color14/90 py-24 border-b border-b-d36 rounded-b-[20px]"
    >
      <div
        class="containerClass place-items-center md:place-items-start lg:place-items-center gap-12 grid md:gap-4 lg:gap-0 md:grid-cols-12"
      >
        <div class="relative md:col-span-6 lg:col-span-5">
          <div
            class="w-[276px] h-[365px] md:w-[300px] md:h-[400px] lg:w-[360px] lg:h-[500px] absolute bg-twoC rounded rotate-[9deg]"
          ></div>
          <div
            class="w-[270px] h-[347px] md:w-[300px] md:h-[400px] lg:w-[360px] lg:h-[500px] rounded z-10 relative bg-gray-300 animate-pulse"
          ></div>
        </div>
        <div
          class="space-y-4 w-full mx-auto relative md:col-span-6 lg:col-span-7"
        >
          <div class="h-10 w-48 bg-gray-300 rounded animate-pulse"></div>
          <div class="grid lg:grid-cols-2 gap-4 lg:gap-0 justify-between">
            <div class="flex gap-2">
              <div class="space-y-4">
                <div class="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div class="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div class="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div class="space-y-4">
                <div class="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
                <div class="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
                <div class="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            <div class="flex gap-2">
              <div class="space-y-4">
                <div class="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div class="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div class="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div class="space-y-4">
                <div class="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
                <div class="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
                <div class="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          <div class="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
          <div class="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>
          <div class="w-full flex items-center gap-4">
            <div
              class="h-12 w-[90%] bg-gray-300 rounded-lg animate-pulse"
            ></div>
            <div class="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actual Comic Data -->
    <div
      v-else
      v-auto-animate
      class="bg-color14/90 py-24 border-b border-b-d36 rounded-b-[20px]"
    >
      <div
        v-auto-animate
        class="px-4 md:px-8 lg:px-12 xl:px-16 justify-center items-center md:items-start gap-12 grid md:gap-4 md:grid-cols-12"
      >
        <div
          v-auto-animate
          class="relative justify-self-center md:col-span-6 lg:col-span-5"
        >
          <div
            class="w-[276px] h-[365px] md:w-[300px] md:h-[400px] lg:w-[360px] lg:h-[500px] absolute bg-twoC rounded rotate-[9deg]"
          ></div>
          <NuxtImg
            :src="comicData?.data?.image"
            class="w-[270px] h-[347px] md:w-[300px] md:h-[400px] lg:w-[360px] lg:h-[500px] rounded z-10 object-fill relative"
            :alt="`Read collections ${comicData?.data?.full_name} comic books online in PDF for free by ${comicData?.data?.writer?.name}, illustrated by ${comicData?.data?.artists.map((i) => i?.name).join(' and ')}. Enjoy best free stories now.`"
            :width="$device.isMobile ? 270 : 360"
            :height="$device.isMobile ? 347 : 500"
            format="webp"
            quality="85"
            loading="eager"
            fetchpriority="high"
            sizes="270px md:300px lg:360px"
            placeholder
          />
        </div>
        <div
          v-auto-animate
          class="space-y-4 w-full mx-auto relative md:col-span-6 lg:col-span-7"
        >
          <h1 class="text-d36 text-2xl md:text-4xl font-semibold md:font-bold">
            {{
              comicData?.data?.full_name.replace(
                /(\(\d{4}\))/,
                `${$t("Comic")} $1`
              )
            }}
          </h1>
          <div
            v-auto-animate
            class="grid lg:grid-cols-2 gap-4 lg:gap-0 justify-between"
          >
            <div v-auto-animate class="flex gap-2">
              <div v-auto-animate>
                <p class="font-semibold text-bf text-lg">
                  {{ $t("common.rating") }}:
                </p>
                <p
                  :class="
                    comicData?.data?.genres?.length > 3 ||
                    comicData?.data?.artists?.length > 3
                      ? 'my-8 md:my-6'
                      : 'my-6 md:my-4'
                  "
                  class="font-semibold text-bf text-lg"
                >
                  {{ $t("mostReading.writer") }}:
                </p>
                <p class="font-semibold text-bf text-lg">
                  {{ $t("mostReading.artist") }}:
                </p>
              </div>
              <div>
                <PublicStars
                  :value="Number(comicData?.data?.rate) || 0"
                  color="text-white"
                />
                <p
                  @click="
                    getSearchLink(
                      $t('mostReading.writer'),
                      comicData?.data?.writer?.slug
                    )
                  "
                  :class="
                    comicData?.data?.genres?.length > 3 ||
                    comicData?.data?.artists?.length > 3
                      ? 'my-8 md:my-6'
                      : 'my-6 md:my-4'
                  "
                  class="text-white block w-fit cursor-pointer transition-all duration-300 border-b border-transparent capitalize font-semibold text-lg hover:border-white"
                >
                  {{ comicData?.data?.writer?.name || "Unknown Writer" }}
                </p>

                <div>
                  <p
                    v-for="(artist, index) in comicData?.data?.artists || []"
                    :key="artist?.id"
                    @click="
                      getSearchLink($t('mostReading.artist'), artist?.slug)
                    "
                    class="text-white w-fit cursor-pointer inline-block transition-all duration-300 border-b border-transparent capitalize font-semibold text-lg hover:border-white"
                  >
                    {{ artist?.name
                    }}{{
                      comicData?.data?.artists?.length - 1 !== index ? ", " : ""
                    }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <div>
                <p class="font-semibold text-bf text-lg">
                  {{ $t("mostReading.publisher") }}:
                </p>
                <p
                  :class="
                    comicData?.data?.genres?.length > 3 ||
                    comicData?.data?.artists?.length > 3
                      ? 'my-8 md:my-6'
                      : 'my-6 md:my-4'
                  "
                  class="font-semibold text-bf text-lg"
                >
                  {{ $t("mostReading.genre") }}:
                </p>
                <p class="font-semibold text-bf text-lg">
                  {{ $t("common.status") }}:
                </p>
              </div>
              <div>
                <nuxt-link
                  :to="
                    localePath(`/publisher/${comicData?.data?.publisher?.slug}`)
                  "
                  class="text-white block w-fit cursor-pointer transition-all duration-300 border-b border-transparent capitalize font-semibold text-lg hover:border-white"
                >
                  {{ comicData?.data?.publisher?.name || "Unknown Publisher" }}
                </nuxt-link>
                <div
                  :class="
                    comicData?.data?.genres?.length > 3 ||
                    comicData?.data?.artists?.length > 3
                      ? 'my-8 md:my-6'
                      : 'my-6 md:my-4'
                  "
                >
                  <p
                    v-for="(genre, index) in comicData?.data?.genres || []"
                    :key="genre?.id"
                    @click="getSearchLink($t('mostReading.genre'), genre?.slug)"
                    class="text-white inline-block w-fit cursor-pointer transition-all duration-300 border-b border-transparent capitalize font-semibold text-lg hover:border-white"
                  >
                    {{ genre?.name }}
                    {{
                      comicData?.data?.genres?.length - 1 !== index ? "," : ""
                    }}
                  </p>
                </div>
                <div
                  :class="
                    comicData?.data?.genres?.length > 3 ||
                    comicData?.data?.artists?.length > 3
                      ? '-mt-7'
                      : ''
                  "
                  class="flex items-center gap-1"
                >
                  <p class="bg-twoCA rounded-full w-2 h-2"></p>
                  <p class="text-white font-medium text-lg">
                    {{ comicData?.data?.status || "Unknown Status" }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:hidden" v-if="!$device.isDesktop" v-auto-animate>
            <div
              v-html="limitedDescription"
              v-auto-animate
              class="inline text-ea font-medium text-base"
            ></div>
            <div
              v-html="remainingDescription"
              v-auto-animate
              class="hidden text-ea font-medium text-base"
              ref="showTextRef"
            ></div>
            <div v-auto-animate class="inline text-d36">
              ...
              <span
                @click="toggle"
                v-auto-animate
                class="text-d36 underline cursor-pointer font-medium text-base"
                >{{ show ? $t("read") : $t("less") }}</span
              >
            </div>
          </div>
          <div
            v-html="comicData?.data?.description"
            v-else
            class="text-ea font-medium text-base hidden lg:block"
          ></div>
          <div class="w-full flex items-center gap-4">
            <button
              :style="{
                backgroundColor: isHovered
                  ? '#e9bd36'
                  : comicData?.data?.checkFavorite
                    ? 'transparent'
                    : '#FCF7E7',
                color: isHovered
                  ? '#141414'
                  : comicData?.data?.checkFavorite
                    ? 'white'
                    : '#141414',
                borderColor: isHovered ? '#e9bd36' : 'white',
              }"
              @click="toggleFav"
              @mouseover="isHovered = true"
              @mouseout="isHovered = false"
              type="button"
              class="py-3 rounded-lg border hover:bg-d36 border-white hover:border-d36 transition-all duration-300 w-[90%] font-semibold text-[22px] leading-[24px]"
            >
              {{
                comicData?.data?.checkFavorite
                  ? $t("common.savedComic")
                  : $t("common.saveComic")
              }}
            </button>
            <UTooltip>
              <template #text>
                <span
                  class="before:content-[''] before:z-10 text-three0 capitalize font-semibold text-xs before:fixed before:w-0 before:h-0 before:border-b-[10px] before:border-white right-0 top-0"
                >
                  {{ $t("common.share") }}
                </span>
              </template>
              <div
                @click="startShare"
                class="bg-five9 hover:bg-d36 transition-all duration-300 cursor-pointer grid place-items-center rounded-full h-[60px] w-[60px] text-white"
              >
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
              </div>
            </UTooltip>
          </div>
        </div>
      </div>
    </div>

    <div class="containerClass">
      <div class="w-full mt-8 rounded-lg md:mt-12 mx-auto text-center">
        <LazyHomeGoogleAdsWithIns hydrate-on-idle />
      </div>
    </div>

    <!-- Skeleton Loader for Chapters -->
    <div v-if="loadingChapters" class="flex gap-2 items-center my-8 md:px-12">
      <div class="h-10 w-48 bg-gray-300 rounded animate-pulse"></div>
      <div class="flex-grow bg-gray-300 h-[0.25px]"></div>
    </div>
    <div v-if="loadingChapters" class="containerClass">
      <div
        class="grid gap-4 py-8 place-items-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <template v-for="index in 4" :key="index">
          <div
            class="flex flex-col relative h-[357px] md:h-[502px] overflow-hidden"
          >
            <div
              class="h-[250px] md:h-[400px] w-full bg-gray-300 rounded animate-pulse"
            ></div>
            <div class="h-6 w-3/4 bg-gray-300 rounded mt-4 animate-pulse"></div>
            <div class="h-4 w-1/2 bg-gray-300 rounded mt-2 animate-pulse"></div>
          </div>
        </template>
      </div>
    </div>

    <!-- Actual Chapters Section -->
    <div v-else>
      <div
        v-if="chapters?.length > 0"
        class="flex gap-2 items-center my-8 md:px-12"
      >
        <h2
          class="px-4 md:px-0 font-semibold md:font-bold text-white text-2xl md:text-4xl"
        >
          {{ $t("common.chapters") }}
        </h2>
        <hr class="flex-grow bg-[#747474] h-[0.25px]" />
      </div>
      <div v-if="chapters?.length > 0" class="containerClass">
        <div
          ref="scrollTo"
          class="grid gap-y-6 py-4 gap-x-2 md:gap-8 lg:gap-12 place-items-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <NuxtLink
            data-aos="zoom-out-up"
            data-aos-duration="500"
            data-aos-easing="ease-out-cubic"
            data-allow-mismatch="class"
            class="flex flex-col relative h-[407px] w-full md:h-[502px] overflow-hidden md:hover:rounded-md group md:hover:shadow-combined-hover cursor-pointer transition-all duration-300"
            v-for="chapter in chapters || []"
            :key="chapter.id"
            :to="localePath(`/chapter/${chapter?.slug}`)"
          >
            <div
              class="transition-all duration-300 absolute top-0 left-0 w-full h-full bg-black/50 hidden md:group-hover:block"
            ></div>
            <div class="block">
              <svg
                width="71"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                class="absolute opacity-0 transform scale-75 transition-all duration-300 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:group-hover:opacity-100 md:group-hover:scale-100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.46862"
                  y="0.499866"
                  width="68.6847"
                  height="68.6847"
                  rx="34.3423"
                  fill="#FCF7E7"
                />
                <rect
                  x="1.46862"
                  y="0.499866"
                  width="68.6847"
                  height="68.6847"
                  rx="34.3423"
                  stroke="#747474"
                  stroke-width="0.999733"
                />
                <g clip-path="url(#clip0_1303_1956)">
                  <path
                    d="M21.4708 19.0575H21.4673C21.2748 19.0571 21.0842 19.0948 20.9064 19.1685C20.7285 19.2422 20.5671 19.3503 20.4313 19.4867C20.2929 19.6241 20.1831 19.7877 20.1084 19.9678C20.0337 20.148 19.9955 20.3412 19.9961 20.5362V42.7091C19.9961 43.5222 20.6602 44.1853 21.4766 44.1874C24.9185 44.1956 30.685 44.913 34.6631 49.076V25.8714C34.6631 25.5958 34.5927 25.3369 34.4598 25.1226C31.1948 19.8645 24.9204 19.0656 21.4708 19.0575ZM51.6257 42.7091V20.5361C51.6257 20.1393 51.4711 19.7665 51.1905 19.4866C51.0547 19.3502 50.8933 19.2421 50.7155 19.1684C50.5377 19.0947 50.3471 19.057 50.1547 19.0574H50.151C46.7015 19.0656 40.4272 19.8645 37.162 25.1226C37.0291 25.3369 36.9589 25.5958 36.9589 25.8714V49.0758C40.937 44.9128 46.7035 44.1955 50.1453 44.1873C50.9616 44.1852 51.6257 43.5221 51.6257 42.7091Z"
                    fill="#1A1A1A"
                  />
                  <path
                    d="M54.9942 24.1709H53.9221V42.7091C53.9221 44.7851 52.2307 46.4779 50.1515 46.4831C47.232 46.49 42.4183 47.0609 39.0091 50.2875C44.9053 48.8439 51.1209 49.7823 54.6632 50.5896C54.8802 50.6396 55.1058 50.6399 55.3229 50.5904C55.54 50.5409 55.7431 50.4429 55.917 50.3038C56.0908 50.1657 56.2311 49.9901 56.3273 49.7901C56.4235 49.59 56.4732 49.3708 56.4727 49.1488V25.6493C56.4728 24.8341 55.8094 24.1709 54.9942 24.1709ZM17.701 42.7091V24.1709H16.6288C15.8138 24.1709 15.1504 24.8341 15.1504 25.6493V49.1484C15.1504 49.6006 15.353 50.0216 15.7061 50.3034C15.8799 50.4426 16.083 50.5406 16.3002 50.5901C16.5173 50.6396 16.7428 50.6393 16.9598 50.5891C20.5021 49.7818 26.7179 48.8434 32.6138 50.2871C29.2047 47.0606 24.391 46.4899 21.4716 46.4829C19.3925 46.4779 17.701 44.7851 17.701 42.7091Z"
                    fill="#1A1A1A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1303_1956">
                    <rect
                      width="41.3223"
                      height="41.3223"
                      fill="white"
                      transform="translate(15.1504 14.181)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div class="block">
              <v-lazy-image
                :src-placeholder="load"
                :src="chapter?.image"
                :alt="
                  t('chapter.altText', {
                    title: comicData?.data?.full_name,
                    chapter: chapter?.rank,
                    writer: comicData?.data?.writer?.name,
                  })
                "
                class="transition-all w-full object-fill md:group-hover:h-[350px] h-[250px] md:h-[400px] duration-300 md:group-hover:rounded-b-lg flex-shrink"
              />
            </div>

            <p
              class="hidden transition-all truncate md:w-full md:block md:group-hover:hidden duration-300 font-semibold text-white md:text-2xl pt-4 pb-2"
            >
              {{ comicData?.data?.full_name }}
            </p>
            <p
              class="hidden -mt-2 md:block transition-all md:group-hover:hidden duration-300 text-base font-medium text-white"
            >
              #{{ chapter?.rank }}
            </p>
            <p
              class="hidden md:block transition-all md:group-hover:hidden duration-300 text-base font-medium text-ea"
            >
              {{ $t("common.visitor") }}: {{ chapter?.visitors || 0 }}
            </p>

            <!-- Chapter Details on Hover -->
            <div
              class="bg-black w-full h-full relative z-10 hidden transition-all duration-300 md:group-hover:block text-white px-4 py-5 space-y-2 rounded-b"
            >
              <div class="block">
                <p class="font-semibold text-lg truncate">
                  {{ comicData?.data?.full_name }}
                </p>
              </div>
              <p class="transition-all duration-300 font-medium text-white">
                #{{ chapter?.rank }}
              </p>
              <PublicStars
                :count="Number(chapter?.rateCount) || 0"
                :value="Number(chapter?.rate) || 0"
              />
              <p class="text-base font-medium text-ea">
                {{ $t("common.visitor") }}: {{ chapter?.visitors || 0 }}
              </p>

              <div
                @click.prevent="toggleFavChapter(chapter?.id)"
                :class="locale === 'ar' ? 'left-4' : 'right-4 '"
                class="absolute bottom-8 w-[42px] h-[42px] rounded-full bg-[#747474] grid place-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="transition-all duration-300"
                  :class="
                    chapter?.checkFavorite
                      ? 'text-transparent hidden'
                      : 'text-white'
                  "
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z"
                  />
                </svg>
                <svg
                  class="transition-all duration-300"
                  :class="
                    chapter?.checkFavorite
                      ? 'text-white'
                      : 'text-transparent hidden'
                  "
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"
                  />
                </svg>
              </div>
            </div>

            <!-- Mobile View -->
            <div class="md:hidden bg-color14 p-4 space-y-2 text-white">
              <div class="block">
                <p class="font-semibold line-clamp-2 h-[50px] text-lg">
                  {{ comicData?.data?.full_name }}
                </p>
              </div>

              <p
                class="transition-all duration-300 text-sm font-medium text-white"
              >
                #{{ chapter?.rank || "N/A" }}
              </p>

              <p class="text-sm font-medium text-ea">
                {{ $t("common.visitor") }}: {{ chapter?.visitors || 0 }}
              </p>
            </div>

            <div
              @click.prevent="toggleFavChapter(chapter?.id)"
              :class="locale === 'ar' ? 'left-2' : 'right-2'"
              class="md:hidden text-white absolute top-3 w-[44px] h-[44px] rounded-full bg-color14 grid place-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="transition-all duration-300"
                :class="
                  chapter?.checkFavorite
                    ? 'text-transparent hidden'
                    : 'text-white'
                "
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z"
                />
              </svg>
              <svg
                class="transition-all duration-300"
                :class="
                  chapter?.checkFavorite
                    ? 'text-white'
                    : 'text-transparent hidden'
                "
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"
                />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Pagination for Chapters -->
      <div
        v-if="totalPages && totalPages > 1"
        :class="locale === 'ar' ? 'flex-row-reverse' : ''"
        class="flex flex-wrap justify-center items-center gap-2 md:gap-8 my-8"
      >
        <button
          aria-label="prev"
          type="button"
          @click="goToPreviousChapter"
          :disabled="currentPage === 1"
          class="w-[30px] h-[30px] md:w-[45px] md:h-[45px] transition-all duration-300 hover:bg-d36 hover:text-color14 hover:border-d36 active:bg-d36 active:text-color14 active:border-d36 cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
        >
          <svg
            class="w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"
            />
          </svg>
        </button>
        <ul class="flex flex-wrap gap-1 md:gap-2 items-center text-white">
          <li :key="'pageOne'">
            <button
              aria-label="pageOne"
              type="button"
              @click="goToChapterPage(1)"
              class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
              :class="currentPage === 1 ? 'bg-f0d' : 'bg-oneA'"
            >
              1
            </button>
          </li>
          <li
            :key="'pointsStart'"
            aria-label="pointsStart"
            v-if="pages[0] > 2"
            class="bg-oneA grid place-items-center w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
          >
            ...
          </li>
          <li v-for="page in pages" :key="page">
            <button
              :aria-label="`goToPage ${page}`"
              type="button"
              @click="goToChapterPage(page)"
              class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
              :class="currentPage === page ? 'bg-f0d' : 'bg-oneA'"
            >
              {{ page }}
            </button>
          </li>
          <li
            :key="'points'"
            aria-label="points"
            v-if="currentPage < totalPages - 3"
            class="bg-oneA grid place-items-center w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
          >
            ...
          </li>
          <li :key="'totalPages'">
            <button
              type="button"
              aria-label="totalPages"
              @click="goToChapterPage(totalPages)"
              class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
              :class="currentPage === totalPages ? 'bg-f0d' : 'bg-oneA'"
            >
              {{ totalPages }}
            </button>
          </li>
        </ul>
        <button
          aria-label="next"
          type="button"
          @click="goToNextChapter"
          :disabled="currentPage === totalPages"
          class="w-[30px] h-[30px] md:w-[45px] md:h-[45px] transition-all duration-300 hover:bg-d36 hover:text-color14 hover:border-d36 active:bg-d36 active:text-color14 active:border-d36 cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Skeleton Loader for Comments -->
    <div
      v-if="loadingComments"
      class="bg-color14 rounded-xl my-8 border border-three0 py-8 px-4 transition-all duration-300 hover:shadow-lg"
    >
      <div class="h-10 w-48 bg-gray-300 rounded animate-pulse"></div>
      <hr class="w-full h-[1px] bg-f0d mt-4" />
      <div class="flex py-4 gap-4">
        <div
          class="w-[100px] h-[100px] rounded-full bg-gray-300 animate-pulse"
        ></div>
        <div class="space-y-4 w-full">
          <div class="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
          <div class="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>
          <div class="h-12 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Actual Comments Section -->
    <div class="containerClass" v-else>
      <div
        data-aos="zoom-out-left"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        data-allow-mismatch="class"
        class="bg-color14 rounded-xl my-8 border border-three0 py-8 px-4 transition-all duration-300 hover:shadow-lg"
      >
        <p class="uppercase text-ea font-semibold text-2xl pb-4">
          {{ $t("common.comments") }}
        </p>
        <div class="w-full h-[1px] bg-bf"></div>
        <div class="flex py-4 gap-4">
          <v-lazy-image
            :src-placeholder="load"
            @error="
              userImage =
                'https://s3.eu-central-1.wasabisys.com/cdn.ysk-book.com/users/default.png'
            "
            :src="userImage"
            :alt="t('user.avatarAlt')"
            class="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full object-cover"
          />
          <!-- 'https://s3.eu-central-1.wasabisys.com/cdn.ysk-book.com/users/default.png' -->
          <div class="space-y-4 w-full">
            <VeeForm
              v-slot="{ isSubmitting }"
              @submit="submitComment"
              v-auto-animate
              class="w-full"
            >
              <VeeField
                type="text"
                as="textarea"
                class="w-full h-28 md:h-20 resize-none outline-none bg-twoC rounded-xl text-bf font-medium text-base p-4"
                name="text"
                id="text"
                :placeholder="$t('common.commentPlaceholder')"
                rules=""
              />
              <VeeErrorMessage
                name="text"
                class="md:text-base text-sm font-medium text-red-500"
              />
              <button
                type="submit"
                :disabled="isSubmitting"
                :class="isSubmitting ? 'bg-gray-400' : 'bg-fc'"
                class="rounded-lg text-color14 my-6 md:my-8 font-semibold px-4 transition-all duration-300 hover:bg-d36 py-3 text-base"
              >
                {{ $t("common.send") }}
              </button>
            </VeeForm>
          </div>
        </div>
        <div class="space-y-4" v-auto-animate>
          <div
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-easing="ease-out-cubic"
            data-allow-mismatch="class"
            v-for="comment in comments || []"
            :key="comment?.id"
            class="bg-oneA relative rounded-[20px] px-10 py-8"
          >
            <Icon
              v-if="comment?.checkMyself"
              @click="delComment(comment?.id)"
              name="material-symbols-light:cancel"
              size="2rem"
              class="text-d36 absolute end-4 hover:bg-red-500 transition-all duration-300 cursor-pointer top-4"
            />
            <div class="flex gap-4">
              <v-lazy-image
                :src-placeholder="load"
                v-if="comment?.user?.image"
                :src="comment?.user?.image"
                :alt="$t('alt.avatar')"
                class="w-[70px] h-[70px] rounded-full object-cover"
              />
              <div class="space-y-4">
                <p class="text-bf font-medium text-lg">
                  {{ comment?.user?.username }}
                </p>
                <p class="text-bf font-medium text-base">
                  {{ comment?.comment }}
                </p>
              </div>
            </div>
            <div
              class="flex bg-twoC rounded-xl mt-4 w-fit p-2 items-center gap-2"
            >
              <!--  :style="comment?.like_count ? 'color:#e9bd36' : 'color:#747474'" -->
              <Icon
                @click="likeComment(comment?.id)"
                name="mynaui:fat-arrow-up-solid"
                class="bg-seven4 cursor-pointer transition-all duration-300 hover:text-d36 hover:bg-d36"
                size="2rem"
              />
              <p class="text-bf">{{ comment?.like_count }}</p>
              <Icon
                @click="DislikeComment(comment?.id)"
                name="mynaui:fat-arrow-down-solid"
                class="bg-seven4 cursor-pointer transition-all duration-300 hover:text-d36 hover:bg-d36"
                size="2rem"
              />
              <p class="text-bf">{{ comment?.dislike_count }}</p>
            </div>
          </div>
        </div>

        <div
          v-if="commentsMeta && commentsMeta?.link_next"
          class="flex pt-4 text-d36 cursor-pointer justify-center items-center gap-2"
          @click="fetchMoreComments"
        >
          <p class="font-semibold text-base">{{ $t("common.viewMore") }}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Skeleton Loader for Similar Comics -->
    <div
      v-if="loadingSimilarComics"
      class="flex gap-2 items-center my-8 md:px-12"
    >
      <div class="h-10 w-48 bg-gray-300 rounded animate-pulse"></div>
      <div class="flex-grow bg-gray-300 h-[0.25px]"></div>
    </div>
    <div v-if="loadingSimilarComics" class="px-2 md:px-12 mb-8">
      <div
        class="grid gap-y-4 gap-x-2 md:gap-4 overflow-hidden place-items-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <template v-for="index in 4" :key="index">
          <div
            class="flex flex-col relative h-[407px] md:h-[502px] overflow-hidden"
          >
            <div
              class="h-[300px] md:h-[400px] w-full bg-gray-300 rounded animate-pulse"
            ></div>
            <div class="h-6 w-3/4 bg-gray-300 rounded mt-4 animate-pulse"></div>
            <div class="h-4 w-1/2 bg-gray-300 rounded mt-2 animate-pulse"></div>
          </div>
        </template>
      </div>
    </div>

    <!-- Actual Similar Comics Section -->
    <div v-else>
      <div
        v-if="comicData?.data?.similar_comics?.length > 0"
        class="flex gap-2 items-center my-8 md:px-12"
      >
        <h2
          class="px-4 md:px-0 font-semibold md:font-bold text-white text-2xl md:text-4xl"
        >
          {{ $t("common.similarComics") }}
        </h2>
        <hr class="flex-grow bg-[#747474] h-[0.25px]" />
      </div>
      <div class="px-2 md:px-12 mb-8">
        <div
          class="grid gap-y-6 py-4 gap-x-2 md:gap-8 lg:gap-12 place-items-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <NuxtLink
            data-aos="flip-left"
            data-aos-duration="500"
            data-allow-mismatch="class"
            data-aos-easing="ease-out-cubic"
            class="flex flex-col relative h-[357px] w-full md:h-[502px] md:hover:rounded-md group md:hover:shadow-combined-hover cursor-pointer transition-all duration-300"
            v-for="(comic, index) in comicData?.data?.similar_comics || []"
            :key="comic?.id"
            :to="localePath(`/comic/${comic?.slug}`)"
          >
            <div
              class="transition-all duration-300 absolute top-0 left-0 w-full h-full bg-black/50 hidden md:group-hover:block"
            ></div>

            <div>
              <svg
                width="71"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                class="absolute opacity-0 transform scale-75 transition-all duration-300 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:group-hover:opacity-100 md:group-hover:scale-100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.46862"
                  y="0.499866"
                  width="68.6847"
                  height="68.6847"
                  rx="34.3423"
                  fill="#FCF7E7"
                />
                <rect
                  x="1.46862"
                  y="0.499866"
                  width="68.6847"
                  height="68.6847"
                  rx="34.3423"
                  stroke="#747474"
                  stroke-width="0.999733"
                />
                <g clip-path="url(#clip0_1303_1956)">
                  <path
                    d="M21.4708 19.0575H21.4673C21.2748 19.0571 21.0842 19.0948 20.9064 19.1685C20.7285 19.2422 20.5671 19.3503 20.4313 19.4867C20.2929 19.6241 20.1831 19.7877 20.1084 19.9678C20.0337 20.148 19.9955 20.3412 19.9961 20.5362V42.7091C19.9961 43.5222 20.6602 44.1853 21.4766 44.1874C24.9185 44.1956 30.685 44.913 34.6631 49.076V25.8714C34.6631 25.5958 34.5927 25.3369 34.4598 25.1226C31.1948 19.8645 24.9204 19.0656 21.4708 19.0575ZM51.6257 42.7091V20.5361C51.6257 20.1393 51.4711 19.7665 51.1905 19.4866C51.0547 19.3502 50.8933 19.2421 50.7155 19.1684C50.5377 19.0947 50.3471 19.057 50.1547 19.0574H50.151C46.7015 19.0656 40.4272 19.8645 37.162 25.1226C37.0291 25.3369 36.9589 25.5958 36.9589 25.8714V49.0758C40.937 44.9128 46.7035 44.1955 50.1453 44.1873C50.9616 44.1852 51.6257 43.5221 51.6257 42.7091Z"
                    fill="#1A1A1A"
                  />
                  <path
                    d="M54.9942 24.1709H53.9221V42.7091C53.9221 44.7851 52.2307 46.4779 50.1515 46.4831C47.232 46.49 42.4183 47.0609 39.0091 50.2875C44.9053 48.8439 51.1209 49.7823 54.6632 50.5896C54.8802 50.6396 55.1058 50.6399 55.3229 50.5904C55.54 50.5409 55.7431 50.4429 55.917 50.3038C56.0908 50.1657 56.2311 49.9901 56.3273 49.7901C56.4235 49.59 56.4732 49.3708 56.4727 49.1488V25.6493C56.4728 24.8341 55.8094 24.1709 54.9942 24.1709ZM17.701 42.7091V24.1709H16.6288C15.8138 24.1709 15.1504 24.8341 15.1504 25.6493V49.1484C15.1504 49.6006 15.353 50.0216 15.7061 50.3034C15.8799 50.4426 16.083 50.5406 16.3002 50.5901C16.5173 50.6396 16.7428 50.6393 16.9598 50.5891C20.5021 49.7818 26.7179 48.8434 32.6138 50.2871C29.2047 47.0606 24.391 46.4899 21.4716 46.4829C19.3925 46.4779 17.701 44.7851 17.701 42.7091Z"
                    fill="#1A1A1A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1303_1956">
                    <rect
                      width="41.3223"
                      height="41.3223"
                      fill="white"
                      transform="translate(15.1504 14.181)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div class="block w-full">
              <v-lazy-image
                :src-placeholder="load"
                :src="comic?.image"
                loading="lazy"
                placeholder
                :alt="`${comic?.full_name} - ${$t('similar.comic')}`"
                class="transition-all w-full object-fill md:group-hover:h-[350px] h-[250px] md:h-[400px] duration-300 md:group-hover:rounded-b-lg flex-shrink"
              />
            </div>

            <p
              class="hidden transition-all truncate md:w-full md:block md:group-hover:hidden duration-300 font-semibold text-white md:text-2xl pt-4 pb-2"
            >
              {{ comic?.full_name }}
            </p>
            <p
              class="hidden md:block transition-all md:group-hover:hidden duration-300 text-base font-medium text-ea"
            >
              {{ comic?.writer }}
            </p>

            <div
              class="bg-black relative z-10 hidden transition-all duration-300 md:group-hover:block text-white px-4 py-5 space-y-2 rounded-b"
            >
              <div>
                <p class="font-semibold truncate text-lg">
                  {{ comic?.full_name }}
                </p>
              </div>
              <p class="font-medium text-sm">
                {{ comic?.writer }}
              </p>
              <PublicStarsWithoutText :value="Number(comic?.rate) || 0" />

              <p class="text-sm font-medium">
                {{
                  comic?.genres
                    .map((genre) => genre?.name) // Use concise arrow function to directly return genre.name
                    .join(", ")
                }}
              </p>
              <div
                @click.prevent="toggleFavComic(comic?.id)"
                :class="locale === 'ar' ? 'left-4' : 'right-4 '"
                class="absolute bottom-5 w-[42px] h-[42px] rounded-full bg-[#747474] grid place-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="transition-all duration-300"
                  :class="
                    comic?.checkFavorite
                      ? 'text-transparent hidden'
                      : 'text-white'
                  "
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z"
                  />
                </svg>
                <svg
                  class="transition-all duration-300"
                  :class="
                    comic?.checkFavorite
                      ? 'text-white'
                      : 'text-transparent hidden'
                  "
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"
                  />
                </svg>
              </div>
            </div>

            <div class="md:hidden bg-color14 p-4 space-y-2 text-white">
              <div>
                <p class="font-semibold line-clamp-2 h-[50px] text-lg">
                  {{ comic?.full_name }}
                </p>
              </div>
              <p class="font-semibold text-sm">
                {{ comic?.writer }}
              </p>
            </div>
            <div
              @click.prevent="toggleFavComic(comic?.id)"
              :class="locale === 'ar' ? 'left-2' : 'right-2'"
              class="md:hidden text-white absolute top-3 w-[44px] h-[44px] rounded-full bg-color14 grid place-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="transition-all duration-300"
                :class="
                  comic?.checkFavorite
                    ? 'text-transparent hidden'
                    : 'text-white'
                "
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z"
                />
              </svg>
              <svg
                class="transition-all duration-300"
                :class="
                  comic?.checkFavorite
                    ? 'text-white'
                    : 'text-transparent hidden'
                "
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"
                />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    
  </section>
</template>

<script setup>
// 
definePageMeta({
  layout: "default",
  middleware: "redirect",
});

const nuxtApp = useNuxtApp();
const isReady = ref(false);
nuxtApp.hook("app:mounted", () => {
  isReady.value = true;
});

import load from "@/assets/loading.svg";
import VLazyImage from "v-lazy-image";

const isHovered = ref(false);
const { setLogin } = useLogined();

const route = useRoute();

const comments = ref([]);
const commentsMeta = ref(null);
const currentPage = ref(1);
const currentPage2 = ref(1);
const totalPages = ref(0);
const totalPages2 = ref(1);

const { isMobile } = useDevice();
const pages = computed(() => {
  const range = [];
  if (isMobile) {
    // For mobile, show only 4 pages at max (e.g., 1 2 3 4)
    const start = Math.max(2, currentPage.value - 1);
    const end = Math.min(totalPages.value - 1, currentPage.value + 2);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
  } else {
    // For desktop, show a wider range (e.g., 2 3 4 5 6 7 8)
    const start = Math.max(2, currentPage.value - 3);
    const end = Math.min(totalPages.value - 1, currentPage.value + 3);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
  }
  return range;
});

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

const localePath = useLocalePath();

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

const chapters = ref();
const { locale, t } = useI18n();
const toast = useToast();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const loadingComic = ref(false);
const loadingChapters = ref(false);
const loadingComments = ref(false);
const loadingSimilarComics = ref(false);

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
    toast.add({
      title: response.message,
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  } else {
    toast.add({
      title: "An unknown error occurred. Please try again.",
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  }
};

const comicData = ref({});

const fetchComicData = async () => {
  try {
    loadingComic.value = true;
    const idVal = route.params.comic;
    if (!idVal) {
      console.error("Comic ID is undefined.");
      return;
    }

    // Explicitly trigger fetch if using useLazyFetch
    const { data, error, execute } = await useFetch(`${url}/comics/${idVal}`, {
      // server: false,
      headers: {
        "X-Localization": locale.value,
        Authorization: `Bearer ${useCookie("authToken").value}`,
      },
      keepalive: true,
      key: idVal,
      getCachedData: (key) => {
        return nuxtApp?.payload?.data[key] || nuxtApp?.static?.data[key];
      },
    });

    // Trigger fetch

    if (error.value) {
      // handleBackendErrors(error?.value);
      comicData.value = {}; // Reset to an empty object on error
    } else if (data.value) {
      comicData.value = data.value || {};
      useHead({
        link: [
          {
            rel: "preload",
            as: "image",
            href: comicData.value?.data?.image,
            fetchpriority: "high",
            imagesrcset: `${comicData.value?.data?.image}?width=270 270w, ${comicData.value?.data?.image}?width=300 300w, ${comicData.value?.data?.image}?width=360 360w`,
            imagesizes:
              "(max-width: 768px) 270px, (max-width: 1024px) 300px, 360px",
            tagPriority: "critical",
          },
          {
            rel: "preconnect",
            href: comicData.value?.data?.image,
          },
          {
            rel: "dns-prefetch",
            href: comicData.value?.data?.image,
          },
        ],
      });

      await fetchComments();
    }
  } catch (error) {
    // handleBackendErrors(error?.data || { message: error.message });
    comicData.value = {}; // Reset to an empty object on error
  } finally {
    loadingComic.value = false;
  }
};
// Fetch Comments
const fetchComments = async (page = 1) => {
  try {
    loadingComments.value = true;

    const { data, error, execute } = await useLazyFetch(
      `${url}/comics/${comicData.value.data.id}/comments?page=${page}`,
      {
        headers: {
          "X-Localization": locale.value,
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
      }
    );

    // Trigger fetch

    if (error.value) {
      // handleBackendErrors(error.value);
    } else if (data.value) {
      if (page === 1) {
        comments.value = data.value?.data?.data_messages || [];
        // console.log(comments.value);
      } else {
        comments.value = [
          ...comments.value,
          ...(data.value?.data?.data_messages || []),
        ];
      }
      commentsMeta.value = data.value?.data?.meta || null;
      currentPage2.value = data.value?.data?.meta?.current_page || 1;
      totalPages2.value = data.value?.data?.meta?.total_pages || 1;
    }
  } catch (error) {
    // handleBackendErrors(error?.data || { message: error.message });
  } finally {
    loadingComments.value = false;
  }
};
// Fetch Chapters
const fetchChapters = async (page = 1) => {
  try {
    loadingChapters.value = true;

    const idVal = route.params.comic;
    if (!idVal) {
      console.error("Comic ID is undefined.");
      return;
    }

    const { data, error, execute } = await useFetch(
      `${url}/comics/${idVal}/chapters?page=${page}`,
      {
        headers: {
          "X-Localization": locale.value,
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
      }
    );

    if (error.value) {
      throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
    } else if (data.value) {
      chapters.value = data.value?.data?.data_messages || [];
      totalPages.value = data.value?.data?.meta?.total_pages || 1;
    }
  } catch (error) {
    // handleBackendErrors(error?.data || { message: error.message });
  } finally {
    loadingChapters.value = false;
  }
};

// Pagination for Chapters
const goToChapterPage = async (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return;
  currentPage.value = page;
  await fetchChapters(page);
  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const goToNextChapter = async () => {
  if (currentPage.value >= totalPages.value) return;
  currentPage.value += 1;
  await fetchChapters(currentPage.value);
  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const goToPreviousChapter = async () => {
  if (currentPage.value <= 1) return;
  currentPage.value -= 1;
  await fetchChapters(currentPage.value);
  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

// Fetch More Comments
const fetchMoreComments = async () => {
  if (commentsMeta.value?.link_next) {
    await fetchComments(currentPage2.value + 1);
  }
};

// Submit Comment
const submitComment = async (values, { resetForm }) => {
  if (auth.value) {
    try {
      const reponse = await $fetch(`${url}/comments`, {
        method: "POST",
        headers: {
          "X-Localization": locale.value,
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
        body: JSON.stringify({
          comment: values.text,
          comic_id: comicData.value?.data?.id,
        }),
      });
      comments.value.unshift(reponse?.data);
      resetForm();
    } catch (error) {
      handleBackendErrors(error?.data || { message: error.message });
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
};

const checkFavorite = ref(false);

const toggleFav = async () => {
  // console.log(comicData.value);
  try {
    if (useCookie("authToken").value) {
      const response = await $fetch(`${url}/favorites/toggle-comic`, {
        method: "POST",
        headers: {
          "X-Localization": locale.value,
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
        body: JSON.stringify({
          comic_id: comicData.value?.data?.id,
        }),
      });

      if (response?.status) {
        comicData.value.data.checkFavorite =
          !comicData.value.data.checkFavorite;
        toast.add({
          title: response?.message || "Saved successful!",
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
    handleBackendErrors(error?.data || { message: error.message });
  }
};

const toggleFavChapter = async (id) => {
  try {
    if (useCookie("authToken").value) {
      const response = await $fetch(`${url}/favorites/toggle-chapter`, {
        method: "POST",
        headers: {
          "X-Localization": locale.value,
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
        body: JSON.stringify({
          chapter_id: id,
        }),
      });

      if (response?.status) {
        // console.log("togglinged");
        // fliter chapters.value and toggle item.saved
        const chapterIndex = chapters.value.findIndex(
          (chapter) => chapter.id === id
        );
        // console.log(chapterIndex);

        if (chapterIndex !== -1) {
          chapters.value[chapterIndex].checkFavorite =
            !chapters.value[chapterIndex].checkFavorite;
        }

        toast.add({
          title: response?.message || "Saved successful!",
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
    handleBackendErrors(error?.data || { message: error.message });
  }
};
const delComment = async (id) => {
  // console.log(comicData.value);
  try {
    if (useCookie("authToken").value) {
      const response = await $fetch(`${url}/comments/${id}`, {
        method: "DELETE",
        headers: {
          "X-Localization": locale.value,
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
      });

      if (response?.status) {
        comments.value = comments.value.filter((item) => item.id !== id);

        toast.add({
          title: response?.message || "Saved successful!",
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
    handleBackendErrors(error?.data || { message: error.message });
  }
};
const likeComment = async (id) => {
  try {
    if (useCookie("authToken").value) {
      const response = await $fetch(`${url}/comments/reaction`, {
        method: "POST",
        headers: {
          "X-Localization": locale.value,
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
        body: JSON.stringify({ comment_id: id, reaction: "like" }),
      });

      if (response?.status) {
        const index = comments.value.findIndex((item) => item.id === id);
        if (index !== -1 && response?.data) {
          comments.value[index] = response?.data;
        } else {
          await fetchComments(1);
        }
        toast.add({
          title: response?.message || "Saved successful!",
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
    handleBackendErrors(error?.data || { message: error.message });
  }
};
const DislikeComment = async (id) => {
  try {
    if (useCookie("authToken").value) {
      const response = await $fetch(`${url}/comments/reaction`, {
        method: "POST",
        headers: {
          "X-Localization": locale.value,
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
        body: JSON.stringify({ comment_id: id, reaction: "dislike" }),
      });

      if (response?.status) {
        const index = comments.value.findIndex((item) => item.id === id);
        if (index !== -1 && response?.data) {
          comments.value[index] = response?.data;
        } else {
          await fetchComments(1);
        }
        toast.add({
          title: response?.message || "Saved successful!",
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
    handleBackendErrors(error?.data || { message: error.message });
  }
};

await Promise.all([fetchComicData(), fetchChapters()]);

const toggleFavComic = async (id) => {
  try {
    if (useCookie("authToken").value) {
      const response = await $fetch(`${url}/favorites/toggle-comic`, {
        method: "POST",
        headers: {
          "X-Localization": locale.value,
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
        body: JSON.stringify({
          comic_id: id,
        }),
      });

      if (response?.status) {
        comicData.value.data.checkFavorite =
          !comicData.value.data.checkFavorite;

        toast.add({
          title: response?.message || "Saved successful!",
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
    handleBackendErrors(error?.data || { message: error.message });
  }
};

const userImage = useCookie("image");
const auth = useCookie("authToken");

checkFavorite.value = comicData.value?.data?.checkFavorite || false;

const limitedDescription = computed(() => {
  const description = comicData.value?.data?.description || "";
  return description.length > 150 ? description.slice(0, 150) : description;
});
const remainingDescription = computed(() => {
  const description = comicData.value?.data?.description || "";
  return description.length > 150 ? description.slice(150) : "";
});

const showTextRef = ref();
const toggle = () => {
  show.value = !show.value;
  showTextRef.value.classList.toggle("hidden");
  showTextRef.value.classList.toggle("inline");
};
const show = ref(true);

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: comicData.value?.data?.full_name,
  description: `Read collections ${comicData.value?.data?.full_name} comic books online in PDF for free by ${comicData.value?.data?.writer?.name}, illustrated by ${comicData.value?.data?.artists?.map((i) => i?.name).join(" and ")}. Enjoy best free stories now.`,
  author: {
    "@type": "Person",
    name: comicData.value?.data?.writer?.name,
  },
  illustrator: comicData.value?.data?.artists?.map((i) => ({
    "@type": "Person",
    name: i?.name,
  })),
  publisher: {
    "@type": "Organization",
    name: comicData.value?.data?.publisher?.name,
  },
  inLanguage: locale.value,
  genre: comicData.value?.data?.artists.map((i) => i?.name),
  bookFormat: "EBook",
  datePublished: "2025",
};

// Conditionally add aggregateRating
if (comicData.value?.data?.rate_count) {
  schemaData.aggregateRating = {
    "@type": "AggregateRating",
    ratingValue: comicData.value?.data?.rate,
    reviewCount: comicData.value?.data?.rate_count,
  };
}
useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(schemaData),
    },
  ],
});

const fullName = computed(() => comicData.value?.data?.full_name || "");
const cleanedName = computed(() =>
  fullName.value?.replace(/\s*\((\d{4})\)\s*/g, " $1")
);

const scrollTo = ref();

useSeoMeta({
  title: `${cleanedName.value} comic read online book pdf free - YSK Comics`,
  description: `Read collections ${comicData.value?.data?.full_name} comic books online in PDF for free by ${comicData.value?.data?.writer?.name}, illustrated by ${comicData.value?.data?.artists?.map((i) => i?.name).join(" and ")}. Enjoy best free stories now.`,
  ogTitle: `${cleanedName.value} comic read online book pdf free - YSK Comics`,
  ogDescription: `Read collections ${comicData.value?.data?.full_name} comic books online in PDF for free by ${comicData.value?.data?.writer?.name}, illustrated by ${comicData.value?.data?.artists?.map((i) => i?.name).join(" and ")}. Enjoy best free stories now.`,
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: `${comicData.value?.data?.image}`,
  ogImageHeight: `480`,
  ogImageWidth: `265`,
  keywords: `read ${comicData.value?.data?.full_name} comic online free , read ${comicData.value?.data?.full_name} online  ,${comicData.value?.data?.full_name} , download ${comicData.value?.data?.full_name} pdf free`,
  ogImageAlt: `${cleanedName.value} comic read online book pdf free - YSK Comics`,
  robots: "index, follow",
  author: comicData.value?.data?.writer?.name,
  ogType: "comics",
  ogImageType: "webp",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: `${cleanedName.value} comic read online book pdf free - YSK Comics`,
  twitterDescription: `Read collections ${comicData.value?.data?.full_name} comic books online in PDF for free by ${comicData.value?.data?.writer?.name}, illustrated by ${comicData.value?.data?.artists?.map((i) => i?.name).join(" and ")}. Enjoy best free stories now.`,
  twitterImage: `${comicData.value?.data?.image}`,
  twitterSite: "@YSK_Comics",
  twitterCreator: `@${comicData.value?.data?.writer?.name}`,
  twitterCard: "summary_large_image",
});

useHead({
  meta: [
    {
      name: "copyright",
      content: "YSK Comics",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, shrink-to-fit=no",
    },
    {
      name: "comic:author",
      content: comicData.value?.data?.writer?.name,
    },
    {
      name: "comic:tag",
      content: `${comicData.value?.data?.genres?.map((i) => i?.name).join(",  ")}`,
    },
    {
      name: "comic:publisher",
      content: `${comicData.value?.data?.publisher?.name}`,
    },
    {
      name: "comic:artist",
      content: `${comicData.value?.data?.artists?.map((i) => i?.name).join(",  ")}`,
    },
  ],
  link: [
    {
      rel: "alternate",
      hreflang: locale.value,
      href: `https://www.ysk-comics.com${route.fullPath}`,
    },
    {
      rel: "canonical",
      href: `https://www.ysk-comics.com${route.fullPath}`,
    },
  ],
});

const testing = (e) => {
  console.log(e);
};
</script>
