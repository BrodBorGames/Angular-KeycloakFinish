
import { inject } from "@angular/core";
import axios, { Axios } from "axios";
import { provideKeycloak } from "keycloak-angular";

axios.interceptors.request.use(function (config) {
    config.headers['Authorizaton'] = `Bearer `
    return config;
  }, function (error) {
    console.log(error)
      return Promise.reject(error);
  });

