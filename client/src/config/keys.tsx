
  const keys = (process.env.NODE_ENV === "production" ? (
    require("./prod")
  ):(
    require("./dev")
  ))

  export default keys;


