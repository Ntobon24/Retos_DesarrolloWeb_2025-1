import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';



@Injectable({
  providedIn: 'root'
})
export class Storage {

  supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  async uploadFile(imagefile:File, username:string) {
    const fileName = uuidv4();
   // const { data, error } = this.supabase.storage
   return this.supabase.storage
      .from('instapic')
      .upload(`${username}/${fileName}`, imagefile)
      .then(response=>{
        return response;
      })
      .catch(error=>console.error(error))
  //console.log(`4 - Despues de llamar a supabase`)
   // console.log(data);
   // console.log(error);
  }

  getImageUrl(fullPaht:string){
    return `${SUPABASE_URL}/storage/v1/object/public/${fullPaht}`;
  }


}
