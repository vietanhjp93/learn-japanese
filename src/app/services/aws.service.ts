import { Injectable } from '@angular/core';
import * as AWS from "aws-sdk/global";
import * as s3 from "aws-sdk/clients/s3";
import { environment } from 'src/environments/environment';
import { News } from '../models/newsModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  private bucket = new s3(
    {
      accessKeyId: environment.s3AccessKeyId,
      secretAccessKey: environment.s3SecretAccessKey,
      region: 'ap-northeast-1'
    }
  );
  constructor(private localStorage: LocalStorageService) { }

  uploadFile() {
    const params = {
      Bucket: 'learn-japanese-easy-news-data',
      Key: 'a',
      Body: 'src/assets/a.jpg',
      ContentType: 'image/jpeg'
    };
    this.bucket.upload(params,(err, data) => {
      if(err){
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

  async getNews(source: string) : Promise<News[]> {
    let realData : News[];
    const params = {
      Bucket: 'learn-japanese-easy-news-data',
      Key: `${source}.json`,
      IfModifiedSince : this.localStorage.getLastModified()
    };
    try {
      let data = await this.bucket.getObject(params).promise();
      let date = data.LastModified.getDate();
      this.localStorage.setLastModified(data.LastModified.setDate(date - 1));
      realData = JSON.parse(data.Body.toString("utf8"));
      return realData;
    } catch (err){
      console.log('There was an error get your file: ', err);
    }
    
    console.log('Successfully uploaded file.', realData);
  }
}
