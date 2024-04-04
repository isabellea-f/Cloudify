<template>
  <div class="darkToggle">
    <div id="grid-container">
      <div id="about-us-container">
        <h1>Meet our team</h1>

        <img id="staff-image" src="../assets/bilder/Cloudify-Staff.jpg" alt="Staff picture" />
      </div>

      <div id="about-us-text">
        <h2>Cloudify</h2>
        <p>
          Welcome to our "About Us" page. We are a team of five frontend developer students from
          IT-Högskolan, driven by our passion for technology and innovation. Together, we created a
          weather forecast website designed to be both user-friendly and visually appealing, making
          weather information accessible to everyone.
        </p>
        <p>
          Our project is the result of hours of collaboration, where each of us brought our unique
          strengths and perspectives to the table. From the initial concept to the final
          implementation, we focused on creating an intuitive interface and reliable source for
          weather forecasts, demonstrating our dedication to quality and user experience. This
          journey has not only allowed us to apply what we've learned in a practical setting but
          also to grow as developers and teammates.
        </p>
        <p>
          Our project represents our commitment to teamwork, learning, and applying our skills to
          create something meaningful. Thank you for visiting our site and for your interest in our
          journey. We're excited about the future and the opportunities to continue innovating.
        </p>
        <ul>
          <li>Malin Johansson</li>
          <li>Alex Nelgard</li>
          <li>Hanna Eriksson</li>
          <li>Isabelle Franzén</li>
          <li>Albin Lundmark</li>
        </ul>
      </div>
    </div>

    <div id="contact-container">
      <div id="contact-field">
        <div class="container">
          <div class="form-container">
            <div class="left-container">
              <div class="left-inner-container">
                <h2>Contact us</h2>
                <p>
                  We're here to answer any questions you might have about our weather forecast
                  website or our journey as developers. Whether you're curious about the technology
                  behind our project, have feedback to share, or just want to say hello, we'd love
                  to hear from you.
                </p>
                <img id="cloudifyLogo" src="../assets/img/CloudifyLogo.png" alt="" />
                <h3><v-icon class="footerIcon" icon="mdi-phone"></v-icon> 123-456-789</h3>
                <h3>
                  <v-icon class="footerIcon" icon="mdi-email-outline"></v-icon>cloudify@cloudify.com
                </h3>
                <h3>
                  <v-icon class="footerIcon" icon="mdi-map-marker"></v-icon>Cloud St 15, New York
                </h3>
              </div>
            </div>
            <div class="right-container">
              <div class="right-inner-container">
                <form ref="form" action="#">
                  <h2 class="lg-view">Let's Chat!</h2>
                  <p>* Required</p>
                  <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    v-model="enteredName"
                    @input="validateField"
                    required
                  />
                  <input
                    v-model="email"
                    type="email"
                    name="email"
                    placeholder="Email *"
                    @input="validateField"
                    required
                  />
                  <input type="text" v-model="company" placeholder="Company" name="company" />
                  <input
                    v-model="phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone *"
                    pattern="[0-9]{10}"
                    @input="validateField"
                    required
                  />

                  <textarea
                    v-model="message"
                    rows="4"
                    placeholder="Write a message, max 120 characters *"
                    maxlength="120"
                    @input="validateField"
                    name="textarea"
                    required
                  ></textarea>
                  <button id="submitBtn" @click.prevent="submitPopup">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Meet the staff */
#grid-container {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 1.5fr;
  margin-top: 4vh;
}

li {
  font-size: 1rem;
}
#about-us-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vh;
}

#about-us-container h1 {
  margin-bottom: 2vh;
}

#staff-image {
  height: 65vh;
  width: auto;
  border-radius: 15px;
}

#about-us-text {
  margin-top: 7vh;
  text-align: left;
  line-height: 25px;
  font-size: 18px;
  padding-right: 40px;
}

#about-us-text p {
  margin-bottom: 2rem;
}

#about-us-text h2 {
  overflow-y: hidden;
}

/* Contact information */

#contact-container {
  display: flex;
  margin-bottom: 5vh;
}

#contact-field {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin: 40px 5vw 70px 5vw;
  padding-top: 4vh;
  padding-bottom: 5vh;
}

#contact-field-text {
  text-align: center;
}

#cloudifyLogo {
  height: 60px;
}

h3 {
  font-size: 1rem;
}

/* Form */

.mdi-phone {
  margin-right: 8px;
}

.container {
  background-color: #dbe2ea;
  display: flex;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  width: 768px;
  width: 70%;
  min-height: 550px;
  min-width: 370px;
  margin-bottom: 5rem;
  border-radius: 15px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.form-container {
  display: flex;
}

/* Left container */

.left-container {
  flex: 1;
  height: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
}

.left-inner-container {
  height: 52vh;
  width: 100%;
  text-align: center;
  margin-top: 120px;
}

.left-inner-container p {
  padding-left: 3vw;
  padding: 0 3vw 2vh 3vw;
}

.left-container p {
  font-size: 0.9rem;
}
/* Right container */
.right-container {
  display: flex;
  flex: 1;
  height: 650px;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.right-inner-container {
  width: 70%;
  height: 80%;
  text-align: center;
}

input,
textarea {
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 5px 0px inset;
  border-radius: 20px;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 95%;
  font-size: 0.8rem;
}

input:focus,
textarea:focus {
  outline: 1px solid black;
}

button {
  border-radius: 20px;
  background-color: #2c4e74;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
form p {
  text-align: left;
}

/* Media queries */

/* Form */
@media only screen and (max-width: 900px) {
  .form-container {
    flex-direction: column;
    height: auto;
  }

  .container {
    box-shadow: none;
  }

  .left-container,
  .right-container {
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .left-inner-container,
  .right-inner-container {
    margin-top: 20px;
    margin-bottom: 10px;
    overflow-y: hidden;
    width: 90%;
  }

  .right-container {
    min-height: 650px;
  }
}

@media screen and (min-width: 600px) {
  .col-25 {
    width: 25%;
    margin-left: 25px;
  }
  .col-75 {
    width: 70%;
  }
  input[type='submit'] {
    width: auto;
    float: right;
  }
}

input:required:invalid {
  border-color: red;
}

/* Meet the team */
@media only screen and (max-width: 1400px) {
  #grid-container {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }

  #about-us-text {
    text-align: center;
    padding-left: 4vw;
    padding-right: 4vw;
  }

  #staff-image {
    height: auto;
    width: 80vw;
  }
}
</style>

<script>
export default {
  data() {
    return {
      enteredName: '',
      email: '',
      phone: '',
      message: '',
      company: ''
    }
  },
  methods: {
    validateField(event) {
      const field = event.target
      field.setCustomValidity('')

      if (!field.validity.valid) {
        switch (field.name) {
          case 'username':
            field.setCustomValidity('Please enter your name.')
            break
          case 'email':
            if (field.validity.typeMismatch) {
              field.setCustomValidity('Please enter a valid email address.')
            } else if (field.validity.valueMissing) {
              field.setCustomValidity('Please enter e-mail.')
            }
            break
          case 'phone':
            if (field.validity.patternMismatch) {
              field.setCustomValidity('The phone numbers needs to be 10 digits.')
            } else if (field.validity.valueMissing) {
              field.setCustomValidity('Please enter phone number.')
            }
            break
          case 'textarea':
            field.setCustomValidity('Please enter your message.')
            break
          default:
            field.setCustomValidity('Please fill out this field.')
        }
      }
    },
    clearFields() {
      this.enteredName = ''
      this.email = ''
      this.phone = ''
      this.message = ''
      this.company = ''
    },
    submitPopup() {
      const form = this.$refs.form
      let isValid = form.checkValidity()
      const inputs = form.querySelectorAll('input[required], textarea[required]')
      inputs.forEach((input) => {
        this.validateField({ target: input })
      })

      if (isValid) {
        alert(
          `Thank you for your message, ${this.enteredName}! We have received your inquiry and will get back to you shortly.`
        )
        this.clearFields()
      } else {
        form.reportValidity()
      }
    }
  }
}
</script>
