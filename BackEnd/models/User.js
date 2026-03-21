class User{
  constructor({uid,userName,email}){
    this.uid=uid
    this.userName=userName || 'New User'
    this.email=email
    this.createdAt=new Date().toISOString()
    this.role='user'
  }
  toFireStore(){
    return{
      uid:this.uid,
      userName:this.userName,
      email:this.email,
      createdAt:this.createdAt,
      role:this.role
    }
  }
}

export default User