<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>键盘操作</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <textarea rows="6" style="width:100%;" v-model="content"></textarea>
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
          <ion-col size="3">
            <ion-button @click="clickdirect('s,ctrl')">
              保存
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button @click="clickdirect('x,ctrl')">
              剪切
            </ion-button>
          </ion-col>
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
        </ion-row>
        <ion-row>
          <ion-col size="3">
            <ion-button @click="clickdirect('c,ctrl')">
              复制
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button @click="clickdirect('v,ctrl')">
              粘贴
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
          <ion-col size="3">
            <ion-button @click="clickdirect('z,ctrl')">
              撤销
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button @click="clickdirect('a,ctrl')">
              全选
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button @click="clickdirect('home')">
              Home
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button @click="clickdirect('end')">
              End
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3">
            <ion-button @click="clickdirect('f2')">
              F2
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button @click="clickdirect('f5')">
              F5
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button @click="clickdirect('f11')">
              F11
            </ion-button>
          </ion-col>
          <ion-col size="3">
            <ion-button @click="clickdirect('f12')">
              F12
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">
            <ion-button @click="clickdirect('space')">
              空格
            </ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button @click="clickdirect('tab')">
              Tab
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">
            <ion-button @click="clickdirect('cmd')">
              <ion-icon :icon="logoMicrosoft" />
            </ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button @click="clickdirect('esc')">
              Esc
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-button @click="clickdirect('r,cmd')">
              Ctrl+R
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { arrowBackOutline, arrowForwardOutline, arrowDownOutline, arrowUpOutline, logoMicrosoft } from 'ionicons/icons';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow, IonButton, IonIcon } from '@ionic/vue';
import { Clipboard } from '@capacitor/clipboard';

export default defineComponent({
  name: 'Tab2Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonGrid, IonRow, IonButton, IonIcon },
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
      }).catch((err) => {
        console.log(err);
      });
      content.value = '';
    };
    //方向
    const writeToClipboard = async (text) => {
      await Clipboard.write({
        string: text
      });
    };
    const clickdirect = (direct) => {
      http.get("http://192.168.1.7:8080" + '/key/keytap', { key: direct }).then((res) => {
        console.log(res);
        if (res.status == 200 && res.data.code == 200) {
          if (res.data.data != "") {
            writeToClipboard(res.data.data);
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    };

    return {
      content,
      KeyInputString,
      arrowBackOutline,
      arrowForwardOutline,
      arrowDownOutline,
      arrowUpOutline,
      logoMicrosoft,
      clickdirect
    };
  }
});
</script>
<style>
ion-button {
  width: 100%;
}
</style>
