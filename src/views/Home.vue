<template>
  <div>
    <nav id="nav">
      <div class="flex-auto"><router-link to="/">Dianamitderbrille</router-link></div>
    </nav>
    <div class="hero py-12">
      <div class="container-lg p-responsive">
        <h1>Welcome to my official site</h1>
      </div>
    </div>
    <div class="container-lg p-responsive py-4">
      <h3><router-link to="/signup">Sign up</router-link></h3>
      <h3><router-link to="/login">Log in</router-link></h3>
      <div class="py-4">
        <i class="iconfont iconinstagram mx-2" />
        <i class="iconfont iconfacebook mx-2" />
        <i class="iconfont iconsnapchat mx-2" />
        <i class="iconfont iconamazon mx-2" />
      </div>
    </div>
  </div>
</template>
