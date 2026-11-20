import NbsAlert from '@/components/NbsAlert.vue'

describe('<NbsAlert />', () => {
  it('display error alert', () => {
    cy.mount(NbsAlert, {
      slots: {
        default: 'alert'
      }
    })
    cy.get('.nbs-alert-desc').should('have.text', 'alert')
    cy.get('.nbs-alert').should('have.class', 'nbs-alert--error')
  })

  it('display success alert', () => {
    cy.mount(NbsAlert, {
      slots: {
        default: 'alert'
      },
      props: { type: 'success' }
    })
    cy.get('.nbs-alert').should('have.class', 'nbs-alert--success')
  })

  it('display success alert with close button', () => {
    cy.mount(NbsAlert, {
      slots: {
        default: 'alert'
      },
      props: { type: 'success', close: true }
    })
    cy.get('.nbs-alert-close').should('be.visible')
  })

  it('display success alert with title', () => {
    cy.mount(NbsAlert, {
      slots: {
        default: 'alert',
        title: 'title'
      },
      props: { type: 'success' }
    })
    cy.get('.nbs-alert-title').should('have.text', 'title')
  })
})
