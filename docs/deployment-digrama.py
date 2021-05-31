from diagrams import Cluster, Diagram

from diagrams.programming.language import Nodejs
from diagrams.onprem.network import Nginx
from diagrams.onprem.container import Docker
from diagrams.onprem.database import Mongodb
from diagrams.programming.language import Java

from diagrams.generic.storage import Storage
with Diagram("Bot para desarrollo", show=False):
    proxy = Storage("Proxy")
    bot = Nodejs("bot")
    kbase = Java("Kbase")
    mongodb = Mongodb("mongodb")
    docker = Docker("docker")

    proxy >> bot >> mongodb
    proxy >> kbase >> mongodb >> docker