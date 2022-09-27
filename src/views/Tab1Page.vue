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
import { IonRange,IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow, IonButton } from '@ionic/vue';

var timer = null;
export default defineComponent({
  name: 'Tab1Page',
  components: { IonRange,IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonGrid, IonRow, IonButton },
  setup() {
    const { proxy } = getCurrentInstance();
    const http = proxy.$api;
    const leftToggleStatus = ref(0);
    const msg = ref('');
    const move = ref(10);
    return {
      http,
      leftToggleStatus,
      msg,
      move
    }
  },
  methods: {
    onIonChange({ detail }) {
        this.move = detail.value;
      },
    MouseMoveRightDown() {
      this.http.get('/mouse/move', { move: this.move, angle: 45 }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    MouseMoveDown() {
      this.http.get('/mouse/move', { move: this.move, angle: 90}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    MouseMoveLeftDown() {
      this.http.get('/mouse/move', { move: this.move, angle: 135 }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    MouseMoveRight() {
      this.http.get('/mouse/right', { move: this.move }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    MouseLeftToggle() {
      if (this.leftToggleStatus == 0) {
        this.leftToggleStatus = 1;
        this.http.get('/mouse/lefttoggle', {}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.leftToggleStatus = 0;
        this.http.get('/mouse/lefttoggleup', {}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    MouseMoveLeft() {
      this.http.get('/mouse/left', { move: this.move }).then((res) => {
        console.log(res);
        //this.msg = JSON.stringify(res);
      }).catch((err) => {
        console.log(err);
        //alert(JSON.stringify(err));
      });
    },
    MouseMoveRightTop() {
      this.http.get('/mouse/move', { move: this.move, angle: 315 }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    MouseMoveUp() {
      this.http.get('/mouse/move', { move: this.move, angle: 270 }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    MouseMoveLefTop() {
      this.http.get('/mouse/move', { move: this.move, angle: 225 }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    MouseRightClick() {
      this.http.get('/mouse/rightclick', {}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    MouseScrollMouseDown() {
      this.http.get('/mouse/wheelscrolldown', { move: this.move }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    MouseCenterClick() {
      this.http.get('/mouse/centerclick', {}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    MouseScrollMouseUp() {
      this.http.get('/mouse/wheelscrollup', { move: this.move }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    leftSingleClick() {
      clearTimeout(timer);  //首先清除计时器
      timer = setTimeout(() => {
        if (!timer) {
          return;
        }
        this.http.get('/mouse/leftclick', {}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      }, 300);   //大概时间300ms
    },
    leftDoubleClick() {
      clearTimeout(timer);  //清除
      this.http.get('/mouse/leftdoubleclick', {}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
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
