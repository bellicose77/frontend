import HttpService from "../services/httpService";

export const publicationPost = async (orgDataUrl, body) => {
    const _axios = HttpService.getAxiosClient();
    try {
        const res = await _axios.post(orgDataUrl, body);
        if (res.status === 200) {
        return {
            data: res,
            err: null,
        };
        }
    } catch (err) {
        console.log(err);
        return { data: null, err };
    }
};

export const publicationGet = async (orgDataUrl) => {
  const _axios = HttpService.getAxiosClient();
  try {
    const res = await _axios.get(orgDataUrl);
    if (res.status === 200) {
      return {
        data: res,
        err: null,
      };
    }
  } catch (err) {
    console.log(err);
    return { data: null, err };
  }
};