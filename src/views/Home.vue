<template>
  <div>
    <div class="hero py-12">
      <div class="container-lg p-responsive">
        <div class="col-md-5">
          <h6 class="eyebrow mb-4">Diana mit der brille</h6>
          <h1 class="mb-4">Herzlich willkommen auf meiner offiziellen website</h1>
          <router-link to="/signup" class="btn-mktg mb-3">Subscribe</router-link>
          <p>Or, <router-link to="/login">log in</router-link></p>
        </div>
      </div>
    </div>
    <div class="container-lg p-responsive overflow-hidden">
      <div class="overflow-hidden py-10 border-bottom">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 text-center">
          <div class="bg-blue mx-auto ml-2 hide-sm hide-md rounded-2" style="height: 260px;" />
        </div>
        <div class="col-md-6 float-left pl-md-6 pl-lg-6">
          <h6 class="eyebrow mb-4">Was bietet dir meine Seite?</h6>
          <h2>Title 1</h2>
          <h5>
            Täglich neue Bilder und Videos die von Erotik bis zur Pornografie reichen! Du hast
            ausserdem die Möglichkeit, Wunschbilder und Videoanfragen zu stellen.
          </h5>
        </div>
      </div>
      <div class="overflow-hidden py-10">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 mb-6">
          <h6 class="eyebrow mb-4">Subtitle 2</h6>
          <h2>Subscription bundles</h2>
          <h5>
            Das kannst du jederzeit über die Privatnachrichtenfunktion machen, jede Nachricht wird
            von mir persönlich beantwortet, denn ich bin täglich mehrmals online und habe genügend
            Zeit.
          </h5>
        </div>
        <div class="col-md-6 float-left pl-md-6 pl-lg-6 text-center">
          <div class="border rounded-2 overflow-hidden px-4 py-6">
            <a href="#plan1" class="btn-outline-mktg btn-block my-2">Get 30 days for $29</a>
            <a href="#plan2" class="btn-outline-mktg btn-block my-2">Get 2 months for $49</a>
            <a href="#plan3" class="btn-outline-mktg btn-block my-2">Get 3 months for $59</a>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.4)),
    url('https://gateway.pinata.cloud/ipfs/QmQyvkEP3gSccRKWYxvesZV8TgiiDDEMrsieeR36UCsCb4');
  background-size: cover;
  background-position: center;
}
</style>
