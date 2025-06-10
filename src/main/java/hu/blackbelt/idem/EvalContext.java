package hu.blackbelt.idem;

import lombok.Builder;
import lombok.Getter;
import lombok.With;

import java.util.Map;

@Builder
@Getter
@With
public class EvalContext {
    Map<String, Object> self;
}