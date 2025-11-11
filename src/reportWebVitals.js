import { onCLS, onLCP, onFCP, onTTFB, onINP } from "web-vitals";

function sendToConsole(metric) {
  console.log(metric.name, metric.value);
}

const reportWebVitals = () => {
  onCLS(sendToConsole);
  onLCP(sendToConsole);
  onFCP(sendToConsole);
  onTTFB(sendToConsole);
  onINP(sendToConsole);
};

export default reportWebVitals;
