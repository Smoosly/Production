from flask import Flask

import isKitImgValid
import breastResult
import braRecommend
import braResult

app = Flask(__name__)
app.register_blueprint(isKitImgValid.blueprint)
app.register_blueprint(breastResult.blueprint)
app.register_blueprint(braRecommend.blueprint)
app.register_blueprint(braResult.blueprint)

if __name__ == "__main__":
        # app.debug = True
        app.run(port=5000)
