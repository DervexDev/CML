const vscode = require("vscode")

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("cml.count", function () {
      const repositories = vscode.extensions
        .getExtension("vscode.git")
        .exports.getAPI(1).repositories

      if (repositories.length === 0) {
        return
      }

      const length = repositories[0].inputBox.value.length
      const diff = 72 - length
      let message = "(no chars left)"

      if (diff > 0) {
        message = `(${diff} chars left)`
      } else if (diff < 0) {
        message = `(${diff * -1} chars too long)`
      }

      vscode.window.showInformationMessage(
        `Commit message length: ${length} ${message}`
      )
    })
  )
}

module.exports = { activate }
