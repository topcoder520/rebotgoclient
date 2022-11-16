<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="handRightOutline" />
          <ion-label>操作</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="ScreenView" href="/tabs/ScreenView">
          <ion-icon :icon="keypadOutline" />
          <ion-label>屏幕</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="settingsOutline" />
          <ion-label>设置</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { handRightOutline,keypadOutline,settingsOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      handRightOutline,
      keypadOutline,
      settingsOutline
    }
  }
});
</script>
