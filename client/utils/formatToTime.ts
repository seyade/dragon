export function formatToTime(time: number) {
	let hours: string | number = Math.floor((time / 60 / 60) % 24);
	let minutes: string | number = Math.floor((time / 60) % 60);
	let seconds: string | number = Math.floor(time % 60);

	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	return `${hours} : ${minutes} : ${seconds}`;
}
