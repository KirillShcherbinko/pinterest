<script>
    import axios from "axios";
  
    export default {
        props: {
            showModal: {
                type: Boolean,
                required: true,
            },
        },
        emits: ["close", "published"],
        data() {
            return {
                pinData: {
                    title: "",
                    description: "",
                    picture: null,
                    err: ""
                },
            };
        },
        methods: {
            handleFileUpload(event) {
                this.pinData.picture = event.target.files[0];
            },

            async publishPin() {
                try {
                    const formData = new FormData();
                    formData.append("title", this.pinData.title);
                    formData.append("description", this.pinData.description);
                    formData.append("picture", this.pinData.picture);
            
                    const token = localStorage.getItem("token");
                    
                    await axios.post("http://217.12.38.89:5000/pins", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    });
            
                    this.$emit("published")
                    this.closeModal()
                } catch (e) {
                    this.err = "Failed to publish the pin. Please try again."
                }
            },

            closeModal() {
                this.$emit("close")
            },
        },
    };
</script>


<template>
    <div v-if="showModal" class="modal-overlay">
        <div class="modal">
            <h3>Publish a Pin</h3>
            <form @submit.prevent="publishPin">
                <div>
                    <label class="modal__label" for="title">Title:</label>
                    <input
                        class="modal__input"
                        id="title"
                        v-model="pinData.title"
                        type="text"
                        required
                        placeholder="Enter title"
                    />
                </div>
                <div>
                    <label class="modal__label" for="description">Description:</label>
                    <textarea
                        class="modal__input"
                        id="description"
                        v-model="pinData.description"
                        placeholder="Enter description"
                    ></textarea>
                </div>
                <div>
                    <label class="modal__label" for="image">Image:</label>
                    <input
                        class="modal__input"
                        id="image"
                        type="file"
                        accept="image/jpeg"
                        @change="handleFileUpload"
                        required
                    />
                </div>
                <p v-if="err">{{ err }}</p>
                <div class="button-container">
                    <button class="button" type="submit">Publish</button>
                    <button class="button" type="button" @click="closeModal">Cancel</button>
                </div>
            </form>
        </div>
    </div>
  </template>
  
  <style scoped>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .modal {
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 500px;
        width: 100%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal__label {
        margin-bottom: 15px;
        width: 100%;
        font-size: 10px;
        border: 1px solid #CCCCCC;
        border-radius: 3px;
    }

    .modal__input {
        margin-bottom: 15px;
        width: 100%;
        font-size: 10px;
        border: 1px solid #CCCCCC;
        border-radius: 3px;
    }

    .button-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin: 0 auto;
    }

    .button {
        padding: 10px 20px;
        background-color: #472dbb;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    .button:hover {
        background-color: #4565a0;
    }
  </style>
  