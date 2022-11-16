<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>屏幕</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <canvas id="screen" ref="screen" style="background-color: #CCCCCC;width: 390px;height: 844px;"></canvas>
        </ion-content>
    </ion-page>
</template>
<script>
import { defineComponent, computed, ref, onMounted, } from 'vue';
import { useStore } from 'vuex';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, } from '@ionic/vue';
import { useWindowSize } from '@vant/use';
export default defineComponent({
    name: 'ScreenView',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, },
    setup() {
        const store = useStore();

        //画布
        const screen = ref(null);
        const context2D = ref(null);
        onMounted(() => {
            context2D.value = screen.value.getContext('2d');
        });

        const getBaseUrl = computed(() => {
            var baseUrl = store.getters.baseURL;
            if (!baseUrl) {
                return "";
            }
            if (baseUrl.startsWith("http://")) {
                baseUrl = baseUrl.substring("http://".length);
            }
            return 'ws://' + baseUrl + "/ws/upgrader";
        });
        const socket = new WebSocket(getBaseUrl.value);
        // Connection opened
        socket.addEventListener('open', function () {
            socket.send('Hello Server!');
        });

        // Listen for messages
        const imageScreen = ref('');
        const { width,height } = useWindowSize();
        socket.addEventListener('message', function (event) {
            console.log('Message from server ');
            console.log('useWindowSize:'+width.value,height.value);
            //console.log(event.data);
            var img = new Image();
            img.src = "data:image/jpeg;base64," + event.data;
            img.onload = function () {
                context2D.value.rotate(90 * Math.PI / 180);
                context2D.value.drawImage(img,0,0,img.width,img.height,0,-width.value+92,390,844)
            }
        });
        return {
            imageScreen,
            screen,
        };
    },
});
</script>