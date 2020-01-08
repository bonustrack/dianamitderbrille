<template>
  <div class="py-4 pl-4">
    <div class="d-flex border-bottom pr-4 pb-4 mb-4" v-for="(item, i) in 3" :key="i">
      <div>
        <img
          class="circle mr-3"
          style="width: 60px; height: 60px;"
          src="https://instagram.fbkk5-8.fna.fbcdn.net/v/t51.2885-19/s320x320/72229387_959197884442734_5367445652290666496_n.jpg?_nc_ht=instagram.fbkk5-8.fna.fbcdn.net&_nc_ohc=xM0LL93jKf0AX8VnvP8&oh=e3ff74aef154c465f2b4c2d9203d6e96&oe=5EB0CC7D"
        />
      </div>
      <div class="flex-auto">
        <p>@dianamitderbrille {{ i + 1 }}d</p>
        <img
          class="avatar width-full mb-4"
          src="https://instagram.fbkk5-3.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/79685692_497771590943189_8684923661089324064_n.jpg?_nc_ht=instagram.fbkk5-3.fna.fbcdn.net&_nc_cat=105&_nc_ohc=60r0uZGBG-EAX9rBJ2p&oh=3397833439c914d7e00303e94b0f2ae4&oe=5EA4DEA6"
        />
        <p>Big Buddha ♥️</p>
      </div>
    </div>
  </div>
</template>
