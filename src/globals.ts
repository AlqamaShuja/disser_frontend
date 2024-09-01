
// export const BASEURL = `http://localhost:3000/api/v1/`;
export const BASEURL = `https://dissertationbackend.dissertationwriting.help/api/v1/`;
export const BACKEND_BASEURL = BASEURL.replace("/api/v1/", "");


export const getDiffInDays = (date: string) => {
    const today = new Date();
    const deadlineDate = new Date(date);
    const timeDifference = deadlineDate.getTime() - today.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return dayDifference;
}