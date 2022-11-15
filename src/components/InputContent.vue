<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>输入内容</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="3">
            <ion-button @click="clickdirect('left')">
              <ion-icon :icon="arrowBackOutline" />
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button @click="clickdirect('right')">
              <ion-icon :icon="arrowForwardOutline" />
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button @click="clickdirect('up')">
              <ion-icon :icon="arrowUpOutline" />
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button @click="clickdirect('down')">
              <ion-icon :icon="arrowDownOutline" />
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">
            <ion-button @click="KeyInputString" expand="full">Enter(传输)</ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button @click="clickdirect('backspace')" expand="full">Backspace</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <textarea rows="6" ref="textarea" style="width:100%;" v-model="content"></textarea>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, } from 'vue';
import { useStore } from 'vuex';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow, IonButton } from '@ionic/vue';
import { arrowBackOutline, arrowForwardOutline, arrowDownOutline, arrowUpOutline, } from 'ionicons/icons';

export default defineComponent({
  name: 'InputContent',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonGrid, IonRow, IonButton },
  setup() {

    const store = useStore();
    const { proxy } = getCurrentInstance();
    const http = proxy.$api;

    //传输内容
    const content = ref('');
    const KeyInputString = () => {
      console.log(content.value);
      const inputstring = content.value;
      console.log(store.getters.baseURL);
      http.post(store.getters.baseURL + '/key/Keyinputstring', { content: inputstring }).then((res) => {
        console.log(res);
        content.value = '';
      }).catch((err) => {
        console.log(err);
      });
    };
    //方向
    const clickdirect = (direct) => {
      http.get(store.getters.baseURL + '/key/keytap', { key: direct }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };

    return {
      content,
      KeyInputString,
      clickdirect,

      arrowBackOutline,
      arrowForwardOutline,
      arrowDownOutline,
      arrowUpOutline,

     
    };
  }
});
</script>
<style>
ion-button {
  width: 100%;
}
</style>
