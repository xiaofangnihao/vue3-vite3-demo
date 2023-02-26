import { ref, reactive } from "vue";
import dayjs from "dayjs";

export const useHomePage = () => {
  let times = reactive({
    hour: undefined,
    minutes: undefined,
    seconds: undefined,
  });
  let now = ref(dayjs(new Date()).format("YYYY年MM月DD号 HH:mm:ss"));
  let hour = ref(new Date().getHours());
  let minutes = ref(new Date().getMinutes());
  let seconds = ref(new Date().getSeconds());

  const setTime = () => {
    now.value = dayjs(new Date()).format("YYYY年MM月DD号 HH:mm:ss");
    hour.value = new Date().getHours();
    minutes.value = new Date().getMinutes();
    seconds.value = new Date().getSeconds();
    times.hour = 18 - hour.value - 1;
    times.minutes = `00${60 - minutes.value - 1}`.slice(-2);
    times.seconds = `00${60 - seconds.value}`.slice(-2);
  };

  return {
    times,
    now,
    hour,
    setTime,
  };
};
