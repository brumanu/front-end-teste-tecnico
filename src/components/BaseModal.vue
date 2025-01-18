<script>
export default {
  name: "BaseModal",
  props: {
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: null,
    },
    open: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: Number,
      default: null,
    },
    closeIcon: {
      type: Boolean,
      default: true,
    },
    closeBackdrop: {
      type: Boolean,
      default: false,
    },
    hasFooter: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    document.addEventListener("click", this.closeModal);
  },
  methods: {
    
    // closeModal(e) {
    //   if (this.closeBackdrop) {
    //     if (e.target.classList.contains("backdrop")) {
    //       this.$emit("close");
    //     }
    //   }
    // },
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeModal);
  },
  data() {
    return {
      dimensions: () => {
        if (window.innerWidth < 1200) {
          return `height: fit-content; width:90%`;
        }
        if (this.height) {
          return `height: ${this.height}px; width:${this.width}px`;
        } else {
          return `width: ${this.width}px`;
        }
      },
      spacing: () => {
        if (this.padding) {
          return `padding: ${this.padding}px`;
        }
      },
    };
  },
};
</script>

<template>
  <Transition name="fade">
    <div v-if="open" class="backdrop">
      <div
        @click.stop=""
        class="modal"
        role="dialog"
        :style="`${dimensions()}; ${spacing()}`"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <svg
          v-if="closeIcon"
          @click="$emit('close')"
          class="close-icon"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.99999 5.58574L11.95 0.635742L13.364 2.04974L8.41399 6.99974L13.364 11.9497L11.95 13.3637L6.99999 8.41374L2.04999 13.3637L0.635986 11.9497L5.58599 6.99974L0.635986 2.04974L2.04999 0.635742L6.99999 5.58574Z"
          />
        </svg>

        <div class="modal-header" id="modalTitle">
          <slot name="header"></slot>
        </div>

        <section class="modal-body" id="modalDescription">
          <slot name="body"> </slot>
        </section>

        <footer class="modal-footer" v-if="hasFooter">
          <slot name="footer"> </slot>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.backdrop {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  padding-top: 20px;

  .modal {
    cursor: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    padding: 1.5rem;
    height: fit-content;
    width: fit-content;
    background: #fff; 
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.25);
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 95vh; /* Limite a altura máxima do modal */
    
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .modal-header{
    justify-content: center;
    display: flex;
  }

  .modal-header,
  .modal-footer {
    flex-shrink: 0; /* Impede que o header e o footer encolham */
    padding: 0.5rem;
  }

  .modal-body {
    flex-grow: 1; /* O corpo expande para preencher o restante do espaço */
    overflow-y: auto; /* Permite rolagem se o conteúdo exceder o tamanho disponível */
    padding: 1rem;
    max-height: calc(95vh - 100px); /* Limita a altura do corpo do modal */
  }

  .close-icon {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    z-index: 1000;

    path {
      fill: var(--color-black);
      transition: var(--transition);
    }

    &:hover {
      path {
        fill: var(--primary-500);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
