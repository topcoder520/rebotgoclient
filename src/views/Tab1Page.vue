<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>操作</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <!-- <ion-row>
          <ion-col>
            <p class="tip">灵敏度：</p>
            <ion-range :ticks="true" @ionChange="onIonChange" :snaps="true" :min="1" :max="100"></ion-range>
          </ion-col>
        </ion-row> -->
        <ion-row>
          <ion-col size="12">
            <div class="mousehandler" @touchstart="moveTouchStart" @touchmove="moveTouchmove" @touchend="moveTouchEnd"
              @click="leftSingleClick" @dblclick="leftDoubleClick">
              <label>手势区</label>
            </div>
          </ion-col>
        </ion-row>
        <ion-row class="mousemove">
          <ion-col size="8">
            <ion-button @touchstart="scrollTouchStart" @touchmove="scrollTouchMove" @touchend="scrollTouchEnd"
              expand="full">滚轮</ion-button>
          </ion-col>
          <ion-col size="4">
            <ion-button @click="MouseLeftToggle()" expand="full">左键按压</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">
            <ion-button @click="showPopup" expand="full">快捷键</ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button @click="showPopupContent()" expand="full">输入</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <van-popup v-model:show="isShowPopup" closeable position="bottom" :style="{ height: '65%' }">
        <ShortCut />
      </van-popup>
      <van-popup v-model:show="isShowPopupContent" closeable position="bottom" :style="{ height: '65%' }">
        <InputContent />
      </van-popup>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from 'vue';
import { useStore } from 'vuex';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow, IonButton } from '@ionic/vue';
import { useBackButton } from '@ionic/vue';

import ShortCut from '@/components/ShortCutContainer.vue';
import InputContent from '@/components/InputContent.vue';

var timer = null;
export default defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonGrid, IonRow, IonButton, ShortCut, InputContent },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const http = proxy.$api;
    const leftToggleStatus = ref(0);
    const move = ref(1);

    //监听返回
    useBackButton(1, () => {
      isShowPopup.value = false;
      isShowPopupContent.value = false;
    });

    //快捷键
    const isShowPopup = ref(false);
    const showPopup = () => {
      isShowPopup.value = true;
    };
    //输入
    const isShowPopupContent = ref(false);
    const showPopupContent = () => {
      isShowPopupContent.value = true;
    };

    /////////////滑轮///////////////
    const scrollStartPointX = ref(0);
    const scrollStartPointY = ref(0);
    const scrollTouchStart = (event) => {
      console.log('scroll start', event);
      scrollStartPointX.value = event.targetTouches[0].pageX;
      scrollStartPointY.value = event.targetTouches[0].pageY;
    }
    const scrollTouchMove = (event) => {
      // 只监听单指划动，多指划动不作响应
      if (event.targetTouches.length > 1) {
        return;
      }
    }
    const scrollTouchEnd = (event) => {
      console.log('scroll end', event);
      var distanceX = event.changedTouches[0].pageX - scrollStartPointX.value;
      var distance = Math.abs(distanceX);
      if (distance <= 80) {
        distance = 1;
      } else if (distance <= 160) {
        distance = 4;
      } else {
        distance = 8;
      }
      if (distanceX > 0) {
        MouseScrollMouseDown(distance);
      } else if (distanceX < 0) {
        MouseScrollMouseUp(Math.abs(distance));
      } else {
        MouseCenterClick();
      }
    }
    ///////////////////////////

    //////////触屏////////////
    const touchStartPointX = ref(0);
    const touchStartPointY = ref(0);
    const longPressFlag = ref(0);
    const longMoveFlag = ref(0);
    const moveTouchStart = (event) => {
      console.log('start', event);
      touchStartPointX.value = event.targetTouches[0].pageX;
      touchStartPointY.value = event.targetTouches[0].pageY;
      //长按事件
      clearTimeout(longPressFlag.value);
      clearInterval(longMoveFlag.value);
      longPressFlag.value = setTimeout(() => {
        if (moveDistanceX.value == 0 && moveDistanceY.value == 0) {
          console.log('长按');
          MouseRightClick();
        } else {
          longMoveFlag.value = setInterval(() => {
            moveFunc(moveDistanceX.value, moveDistanceY.value);
          }, 200);
        }

      }, 500);
    };

    const moveDistanceX = ref(0);
    const moveDistanceY = ref(0);
    const moveTouchmove = (event) => {
      // 只监听单指划动，多指划动不作响应
      if (event.targetTouches.length > 1) {
        return;
      }
      //console.log('move', event);
      // 实时计算distance
      moveDistanceX.value = event.targetTouches[0].pageX - touchStartPointX.value;
      moveDistanceY.value = event.targetTouches[0].pageY - touchStartPointY.value;
    };
    const moveTouchEnd = (event) => {
      console.log('end', event);
      clearInterval(longMoveFlag.value);
      clearTimeout(longPressFlag.value);
      // 只监听单指划动，多指划动不作响应
      if (event.changedTouches.length == 1) {
        var distanceX = event.changedTouches[0].pageX - touchStartPointX.value;
        var distanceY = event.changedTouches[0].pageY - touchStartPointY.value;
        moveDistanceX.value = 0;
        moveDistanceY.value = 0;
        moveFunc(distanceX, distanceY);
      }
    };
    //移动
    const moveFunc = (distanceX, distanceY) => {
      console.log(distanceX + " " + distanceY);
      if (distanceX != 0 || distanceY != 0) {
        if (Math.abs(distanceX) > Math.abs(distanceY)) {
          if (distanceX > 0) {
            distanceX = distanceX + move.value;
          } else {
            distanceX = -(Math.abs(distanceX) + move.value);
          }
        } else {
          if (distanceY > 0) {
            distanceY = distanceY + move.value;
          } else {
            distanceY = -(Math.abs(distanceY) + move.value);
          }
        }
        http.get(store.getters.baseURL + '/mouse/move2', { distanceX: distanceX, distanceY: distanceY }).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      }
    };
    /////////////////////

    const onIonChange = ({ detail }) => {
      move.value = detail.value;
    };
    const MouseLeftToggle = () => {
      if (leftToggleStatus.value == 0) {
        leftToggleStatus.value = 1;
        http.get(store.getters.baseURL + '/mouse/lefttoggle', {}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      } else {
        leftToggleStatus.value = 0;
        http.get(store.getters.baseURL + '/mouse/lefttoggleup', {}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      }
    };
    const MouseRightClick = () => {
      http.get(store.getters.baseURL + '/mouse/rightclick', {}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseScrollMouseDown = (moveDistance) => {
      console.log('moveDistance:' + moveDistance);
      http.get(store.getters.baseURL + '/mouse/wheelscrolldown', { move: moveDistance }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseCenterClick = () => {
      http.get(store.getters.baseURL + '/mouse/centerclick', {}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const MouseScrollMouseUp = (moveDistance) => {
      console.log('moveDistance:' + moveDistance);
      http.get(store.getters.baseURL + '/mouse/wheelscrollup', { move: moveDistance }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const leftSingleClick = () => {
      clearTimeout(timer);  //清除
      clearTimeout(longPressFlag.value); //清除长按标记
      clearInterval(longMoveFlag.value);
      timer = setTimeout(() => {
        if (!timer) {
          return;
        }
        http.get(store.getters.baseURL + '/mouse/leftclick', {}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      }, 300);   //大概时间300ms
    };
    const leftDoubleClick = () => {
      clearTimeout(timer);  //清除
      clearTimeout(longPressFlag.value); //清除长按标记
      clearInterval(longMoveFlag.value);
      http.get(store.getters.baseURL + '/mouse/leftdoubleclick', {}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }

    return {
      onIonChange,
      MouseLeftToggle,
      MouseRightClick,
      MouseScrollMouseDown,
      MouseCenterClick,
      MouseScrollMouseUp,
      leftSingleClick,
      leftDoubleClick,
      moveTouchStart,
      moveTouchmove,
      moveTouchEnd,
      scrollTouchStart,
      scrollTouchMove,
      scrollTouchEnd,

      showPopup,
      isShowPopup,
      isShowPopupContent,
      showPopupContent,
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
  min-height: 60px;
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

.tip {
  margin: 0px;
}

.mousehandler {
  height: 380px;
  width: 100%;
  background: rgb(239, 239, 239);
  margin-top: 8px;
  text-align: center;
  vertical-align: middle;
  line-height: 380px;
  color: #c1bbbb;
  font-size: 38px;
}
</style>
