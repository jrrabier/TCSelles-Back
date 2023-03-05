export class SessionUser {

    mail: String;
    lastname: String;
    firstname: String;
    avatar: String;
    role: String;
    sex_id: String;
  
      constructor($mail: String, $lastname: String, $firstname: String, $avatar: String, $role: String, $sex_id: String) {
          this.$mail = $mail;
          this.lastname = $lastname;
          this.firstname = $firstname;
          this.avatar = $avatar;
          this.role = $role;
          this.sex_id = $sex_id;
    }
  
      /**
       * Getter $mail
       * @return {String}
       */
      public get $mail(): String {
          return this.mail;
      }
  
      /**
       * Setter $mail
       * @param {String} value
       */
      public set $mail(value: String) {
          this.mail = value;
      }
  
      /**
       * Getter $lastname
       * @return {String}
       */
      public get $lastname(): String {
          return this.lastname;
      }
  
      /**
       * Setter $lastname
       * @param {String} value
       */
      public set $lastname(value: String) {
          this.lastname = value;
      }
  
      /**
       * Getter $firstname
       * @return {String}
       */
      public get $firstname(): String {
          return this.firstname;
      }
  
      /**
       * Setter $firstname
       * @param {String} value
       */
      public set $firstname(value: String) {
          this.firstname = value;
      }
  
      /**
       * Getter $avatar
       * @return {String}
       */
      public get $avatar(): String {
          return this.avatar;
      }
  
      /**
       * Setter $avatar
       * @param {String} value
       */
      public set $avatar(value: String) {
          this.avatar = value;
      }
  
      /**
       * Getter $role
       * @return {String}
       */
      public get $role(): String {
          return this.role;
      }
  
      /**
       * Setter $role
       * @param {String} value
       */
      public set $role(value: String) {
          this.role = value;
      }
  
      /**
       * Getter $sex_id
       * @return {String}
       */
      public get $sex_id(): String {
          return this.sex_id;
      }
  
      /**
       * Setter $sex_id
       * @param {String} value
       */
      public set $sex_id(value: String) {
          this.sex_id = value;
      }
  }
  
  
  