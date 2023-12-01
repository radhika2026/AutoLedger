from pydantic import BaseModel


class User(BaseModel):
    name: str
    role: str  #set
    gov_id: str
    driving_licsence_id: str
    location: str
    cost: float
    currency: str
    tx_id = 'NULL'

    def to_asset(self):
        asset = {"data": self.dict()}
        return asset

    def set_tx_id(self, tx_id: str):
        self.tx_id = tx_id
        return self
