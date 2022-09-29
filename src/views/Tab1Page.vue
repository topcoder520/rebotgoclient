<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>鼠标操作</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row class="mouseclick">
          <ion-col size="4">
            <ion-button @click="leftSingleClick()" @dblclick="leftDoubleClick()" expand="full"
              style="height:100%;width: 100%;">
              左键</ion-button>
          </ion-col>
          <ion-col size="4">
            <ion-row>
              <ion-button @click="MouseScrollMouseUp()" expand="full">上滚</ion-button>
            </ion-row>
            <ion-row>
              <ion-button @click="MouseCenterClick()" expand="full">点击</ion-button>
            </ion-row>
            <ion-row>
              <ion-button @click="MouseScrollMouseDown()" expand="full">下滚</ion-button>
            </ion-row>
          </ion-col>
          <ion-col size="4">
            <ion-button @click="MouseRightClick()" style="height:100%" expand="full">右键</ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="mousemove">
          <ion-col>
            <ion-button @click="MouseMoveLefTop()" expand="full">左上移</ion-button>
          </ion-col>
          <ion-col>
            <ion-button @click="MouseMoveUp()" expand="full">上移</ion-button>
          </ion-col>
          <ion-col>
            <ion-button @click="MouseMoveRightTop()" expand="full">右上移</ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="mousemove">
          <ion-col>
            <ion-button @click="MouseMoveLeft()" expand="full">左移</ion-button>
          </ion-col>
          <ion-col>
            <ion-button @click="MouseLeftToggle()" expand="full">拖拽</ion-button>
          </ion-col>
          <ion-col>
            <ion-button @click="MouseMoveRight()" expand="full">右移</ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="mousemove">
          <ion-col>
            <ion-button @click="MouseMoveLeftDown()" expand="full">左下移</ion-button>
          </ion-col>
          <ion-col>
            <ion-button @click="MouseMoveDown()" expand="full">下移</ion-button>
          </ion-col>
          <ion-col>
            <ion-button @click="MouseMoveRightDown()" expand="full">右下移</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <p class="tip">灵敏度：</p>
            <ion-range :ticks="true" @ionChange="onIonChange" :snaps="true" :min="10" :max="300"></ion-range>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from 'vue';
import { useStore } from 'vuex';
import { IonRange,IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow, IonButton } from '@ionic/vue';

var timer = null;
export default defineComponent({
  name: 'Tab1Page',
  components: { IonRange,IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonGrid, IonRow, IonButton },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const http = proxy.$api;
    const leftToggleStatus = ref(0);
    const move = ref(10);

    const onIonChange = ({ detail })=>{
      move.value = detail.value;
    };
    const MouseMoveRightDown = ()=>{
      http.get(store.getters.baseURL+'/mouse/move', { move: move.value, angle: 45 }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseMoveDown = ()=> {
      http.get(store.getters.baseURL+'/mouse/move', { move: move.value, angle: 90}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseMoveLeftDown = ()=> {
      http.get(store.getters.baseURL+'/mouse/move', { move: move.value, angle: 135 }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseMoveRight = ()=> {
      http.get(store.getters.baseURL+'/mouse/right', { move: move.value }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseLeftToggle = ()=> {
      if (leftToggleStatus.value == 0) {
        leftToggleStatus.value = 1;
        http.get(store.getters.baseURL+'/mouse/lefttoggle', {}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      } else {
        leftToggleStatus.value = 0;
        http.get(store.getters.baseURL+'/mouse/lefttoggleup', {}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      }
    };
    const MouseMoveLeft = ()=> {
      http.get(store.getters.baseURL+'/mouse/left', { move: move.value }).then((res) => {
        console.log(res);
        //msg = JSON.stringify(res);
      }).catch((err) => {
        console.log(err);
        //alert(JSON.stringify(err));
      });
    };
    const MouseMoveRightTop = ()=> {
      http.get(store.getters.baseURL+'/mouse/move', { move: move.value, angle: 315 }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseMoveUp = ()=> {
      http.get(store.getters.baseURL+'/mouse/move', { move: move.value, angle: 270 }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseMoveLefTop = ()=> {
      http.get(store.getters.baseURL+'/mouse/move', { move: move.value, angle: 225 }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseRightClick = ()=> {
      http.get(store.getters.baseURL+'/mouse/rightclick', {}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseScrollMouseDown = ()=> {
      http.get(store.getters.baseURL+'/mouse/wheelscrolldown', { move: move.value }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseCenterClick = ()=> {
      http.get(store.getters.baseURL+'/mouse/centerclick', {}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseScrollMouseUp = ()=> {
      http.get(store.getters.baseURL+'/mouse/wheelscrollup', { move: move.value }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const leftSingleClick = ()=> {
      clearTimeout(timer);  //首先清除计时器
      timer = setTimeout(() => {
        if (!timer) {
          return;
        }
        http.get(store.getters.baseURL+'/mouse/leftclick', {}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      }, 300);   //大概时间300ms
    };
    const leftDoubleClick = ()=> {
      clearTimeout(timer);  //清除
      http.get(store.getters.baseURL+'/mouse/leftdoubleclick', {}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }

    return {
      onIonChange,
      MouseMoveRightDown,
      MouseMoveDown,
      MouseMoveLeftDown,
      MouseMoveRight,
      MouseLeftToggle,
      MouseMoveLeft,
      MouseMoveRightTop,
      MouseMoveUp,
      MouseMoveLefTop,
      MouseRightClick,
      MouseScrollMouseDown,
      MouseCenterClick,
      MouseScrollMouseUp,
      leftSingleClick,
      leftDoubleClick,
    }
  },
});
</script>
<style scoped>
ion-row {
  border: 1px solid #aaa;
}

ion-col {
  padding: 1px;
}

ion-button {
  margin: 0px;
  width: 100%;
  min-height: 80px;
}

ion-range {
    --bar-background: #bde0fe;
    --bar-background-active: #3880ff;
    --bar-height: 8px;
    --bar-border-radius: 8px;
    --knob-background: #bde0fe;
    --knob-size: 60px;
    --pin-background: #ffafcc;
    --pin-color: #fff;
  }
  .tip{
    margin: 0px;
  }
</style>
