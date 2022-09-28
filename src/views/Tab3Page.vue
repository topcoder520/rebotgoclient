<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>设置</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="settings">
        <van-cell-group>
          <van-cell title="服务地址" value="http://192.168.2.10:8080" is-link to="/service"/>
        </van-cell-group>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  name: 'Tab3Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, }
});
</script>
<style scoped>
  #settings{
    height:100%;
    width:100%;
    background:#eee;
  }
</style>